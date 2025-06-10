import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { CheckRoles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/constants';
import { RolesGuard } from 'src/guards/user.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SELLER, UserRoles.SUPER_ADMIN)
  @UseInterceptors(FilesInterceptor('image'))
  @Post()
  async create(
    @UserDecorator() user: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(new ImageValidationPipe()) file?: Express.Multer.File[],
  ) {
    return this.productsService.create(user, createProductDto, file);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('my-products')
  async myProducts(@UserDecorator() user: any) {
    return this.productsService.myProducts(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @CheckRoles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.SELLER)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @UseGuards(AuthGuard, RolesGuard)
  // @CheckRoles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.SELLER)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.delete(+id);
  // }
}
