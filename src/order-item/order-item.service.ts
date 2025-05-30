import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.models';
import { InjectModel } from '@nestjs/sequelize';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel (OrderItem) private model: typeof OrderItem
  ) {}
  
  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const orderItem = await this.model.create({...createOrderItemDto});
      return sucResponse('New Order creater',orderItem)
    } catch (error) {
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const orderItem = this.model.findAll()
      return sucResponse('All Order',orderItem)
    } catch (error) {
      return catchError(error)
    }
  }

  async findOne(id: number) {
    try {
      const orderItem = await this.model.findByPk(id)
      return sucResponse('OrderItem by elemenent',orderItem)
    } catch (error) {
      return catchError(error)
    }
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const orderItem = await this.model.update(updateOrderItemDto,{where: {id}});
      return sucResponse('OrderItem update',orderItem)
    } catch (error) {
      return catchError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.model.destroy({where: {id}})
      return ({
        data: {}
      })
    } catch (error) {
      return catchError(error)
    }
  }
}
