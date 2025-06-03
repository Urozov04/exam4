import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';
import { User } from 'src/user/model/user.model';
import { OrderItem } from 'src/order-item/models/order-item.models';
import { Product } from 'src/products/models/product.models';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private model: typeof Order,
    @InjectModel(OrderItem) private readonly orderItem: typeof OrderItem,
  ) {}

  async findAll() {
    try {
      const order = await this.model.findAll();
      return sucResponse('All Order', order);
    } catch (error) {
      return catchError(error);
    }
  }

  async myOrders(user: any) {
    try {
      const { id } = user;
      const allMyOrders = await this.model.findAll({
        where: { customerId: id },
        include: [User],
      });
      return sucResponse('All my orders', allMyOrders);
    } catch (error) {
      return catchError(error);
    }
  }

  async findById(id: number) {
    try {
      const order = await this.model.findByPk(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const allOrderItems = await this.orderItem.findAll({
        where: { orderId: id },
        include: [Product],
      });
      return sucResponse(`Order by element`, allOrderItems);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.model.update(updateOrderDto, {
        where: { id },
        returning: true,
      });
      return sucResponse(`Order status changed`, order);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.model.destroy({ where: { id } });
      return { data: {} };
    } catch (error) {
      return catchError(error);
    }
  }
}
