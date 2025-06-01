import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private model: typeof Cart) {}

  async create(createCartDto: CreateCartDto) {
    try {
      console.log(createCartDto);

      const cart = await this.model.create({ ...createCartDto });
      return sucResponse('Cart created', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const cart = await this.model.findAll();
      return sucResponse('Cart Finded', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.model.findByPk(id);
      return sucResponse('Cart FindedById', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const cart = await this.model.update(updateCartDto, { where: { id } });
      return sucResponse('Cart updated', cart);
    } catch (error) {
      return catchError(error);
    }
  }

  async delete(id: number) {
    try {
      await this.model.destroy({ where: { id } });
      return {
        data: {},
      };
    } catch (error) {
      return catchError(error);
    }
  }
}
