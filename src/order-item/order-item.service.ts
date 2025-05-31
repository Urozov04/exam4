import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.models';
import { InjectModel } from '@nestjs/sequelize';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';
import { Sequelize } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private orderItem: typeof OrderItem,
    @InjectModel(Order) private order: typeof Order,
    private readonly sequelize: Sequelize,
  ) {}

  async create(user: any, data: CreateOrderItemDto) {
    const transaction = this.sequelize.transaction();
    try {
      const reqUser = user;
      return reqUser;
      const order = await this.order.create({});
      const orderItem = await this.orderItem.create();
      return sucResponse('New Order creater', orderItem);
    } catch (error) {
      return catchError(error);
    }
  }
}
