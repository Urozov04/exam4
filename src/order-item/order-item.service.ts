import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel (OrderItem) private model: typeof OrderItem
  ) {}
  
  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const orderItem = await this.model.create({...createOrderItemDto});
      return({
        statusCode: 201,
        message: 'success',
        data: {orderItem}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll() {
    try {
      const orderItem = this.model.findAll()
      return({
        statusCode: 200,
        message: 'success',
        data: {orderItem}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const orderItem = await this.model.findByPk(id)
      return({
        statusCode: 200,
        message: 'success',
        data: {orderItem}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const orderItem = await this.model.update(updateOrderItemDto,{where: {id}});
      return({
        statusCode: 200,
        message: 'success',
        data: {orderItem}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async delete(id: number) {
    try {
      await this.model.destroy({where: {id}})
      return ({
        data: {}
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
