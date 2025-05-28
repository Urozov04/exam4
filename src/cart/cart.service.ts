import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {

  constructor(
      @InjectModel (Cart) private model: typeof Cart
    ) {}

  async create(createCartDto: CreateCartDto) {
    try {
      const cart = await this.model.create({...createCartDto});
      return({
        statusCode: 201,
        message: 'success',
        data: {cart}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      const cart = this.model.findAll()
      return({
        statusCode: 200,
        message: 'success',
        data: {cart}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.model.findByPk(id)
      return({
        statusCode: 200,
        message: 'success',
        data: {cart}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const cart = await this.model.update(updateCartDto, {where: {id}});
      return({
        statusCode: 200,
        message: 'success',
        data: {cart}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async delete(id: number) {
    try {
      await this.model.destroy({where: {id}});
      return ({
        data: {}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
