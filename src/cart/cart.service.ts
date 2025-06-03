import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';
import { Product } from 'src/products/models/product.models';
import { User } from 'src/user/model/user.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private model: typeof Cart) {}
  async create(user: any, createCartDto: CreateCartDto) {
    try {
      const { id } = user;
      const { productId } = createCartDto;
      const existCart = await this.model.findOne({ where: { productId } });
      if (existCart) {
        return sucResponse(
          'You have already selected this product, just update the quantity',
          existCart,
        );
      }
      const cart = await this.model.create({ ...createCartDto, userId: id });
      return sucResponse('Cart created', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const cart = await this.model.findAll({ include: [Product, User] });
      return sucResponse('Cart Finded', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async myCart(user: any) {
    try {
      const { id } = user;
      console.log(id, 'AAAAAAAAA');
      const allMyCarts = await this.model.findAll({
        where: { userId: id },
        include: [Product],
      });
      return sucResponse('My cart', allMyCarts);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.model.findByPk(id);
      if (cart) {
        throw new NotFoundException('Cart item with this id not found');
      }
      return sucResponse('Cart FindedById', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const cart = await this.model.findByPk(id);
      console.log(cart);

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
      let quantity = Number(cart?.dataValues.quantity);
      quantity += updateCartDto.quantity;
      await cart?.update({ quantity }, { returning: true });
      return sucResponse('Cart updated', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async delete(id: number) {
    try {
      await this.model.destroy({ where: { id } });
      return sucResponse('Cart deleted', {});
    } catch (error) {
      return catchError(error);
    }
  }
}
