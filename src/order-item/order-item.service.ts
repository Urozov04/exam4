import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './models/order-item.models';
import { InjectModel } from '@nestjs/sequelize';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';
import { Sequelize } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { Cart } from 'src/cart/models/cart.model';
import { Product } from 'src/products/models/product.models';
import { User } from 'src/user/model/user.model';

@Injectable({ scope: Scope.REQUEST })
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem) private orderItem: typeof OrderItem,
    @InjectModel(Order) private order: typeof Order,
    @InjectModel(Cart) private cart: typeof Cart,
    @InjectModel(Product) private product: typeof Product,
    private readonly sequelize: Sequelize,
  ) {}

  async create(user: any, data: CreateOrderItemDto): Promise<object> {
    const transaction = await this.sequelize.transaction();
    try {
      const { id } = user;
      const allActiveCarts = await this.cart.findAll({
        where: { userId: String(id) },
        transaction,
      });
      if (!allActiveCarts || allActiveCarts.length === 0) {
        throw new BadRequestException('There are no any active carts');
      }
      let orderTotalPrice: number = 0;
      let orderTotalProduct: number = 0;
      const newOrder = await this.order.create(
        {
          ...data,
          customerId: id,
          totalPrice: orderTotalPrice,
          totalProduct: orderTotalProduct,
        },
        { transaction },
      );
      for (const cartItem of allActiveCarts) {
        const productItem = await this.product.findOne({
          where: { id: cartItem.dataValues.productId },
          transaction,
        });
        if (!productItem) {
          throw new NotFoundException('Product not found');
        }
        if (productItem?.quantity < cartItem.quantity) {
          throw new BadRequestException('Insufficient stock');
        }
        productItem.quantity -= cartItem.quantity;
        await productItem.save({ transaction });
        const newOrderItem = await this.orderItem.create(
          {
            orderId: newOrder.dataValues.id,
            productId: cartItem.dataValues.productId,
            quantity: cartItem.dataValues.quantity,
            totalPrice:
              Number(productItem.dataValues.price) *
              Number(cartItem.dataValues.quantity),
          },
          { transaction },
        );
        await newOrder.update({
          totalPrice: (orderTotalPrice += Number(
            newOrderItem.dataValues.totalPrice,
          )),
          totalProduct: (orderTotalProduct += Number(
            cartItem.dataValues.quantity,
          )),
        });
      }
      await this.cart.destroy({ where: { userId: String(id) }, transaction });
      await transaction.commit();
      return sucResponse('Order created successfully', newOrder);
    } catch (error) {
      await transaction.rollback();
      return catchError(error);
    }
  }

  async getAll(): Promise<object> {
    try {
      const allOrderItems = await this.orderItem.findAll();
      return sucResponse('All order items', allOrderItems);
    } catch (error) {
      return catchError(error);
    }
  }

  async getById(id: number) {
    try {
      const orderItem = await this.orderItem.findByPk(id, { include: [User] });
      if (!orderItem) {
        throw new NotFoundException('Item not found');
      }
      return sucResponse('Item by id', orderItem);
    } catch (error) {
      return catchError(error);
    }
  }
}
