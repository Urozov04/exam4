import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './models/order-item.models';
import { Order } from 'src/order/models/order.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem, Order])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
