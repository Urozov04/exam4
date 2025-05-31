import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.models';
import { InjectModel } from '@nestjs/sequelize';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';
import { Sequelize } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { Request } from 'express';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private orderItem: typeof OrderItem,
    @InjectModel(Order) private order: typeof Order,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const transaction = this.sequelize.transaction();
    try {
      const order = await this.order.create({});
      const orderItem = await this.orderItem.create();
      return sucResponse('New Order creater', orderItem);
    } catch (error) {
      return catchError(error);
    }
  }
}
