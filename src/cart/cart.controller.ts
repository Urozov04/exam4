import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/constants';
import { RolesGuard } from 'src/guards/user.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Post()
  create(@UserDecorator() user: any, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(user, createCartDto);
  }

  @UseGuards(AuthGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Get('mine')
  myCart(@UserDecorator() user: any) {
    return this.cartService.myCart(user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.CUSTOMER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.delete(+id);
  }
}
