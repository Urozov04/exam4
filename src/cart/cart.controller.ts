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

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@UserDecorator() user: any, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(user, createCartDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  myCart(@UserDecorator() user: any) {
    return this.cartService.myCart(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.cartService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.delete(+id);
  }
}
