import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderStatus, PaymentTypes } from 'src/constants';
import { OrderItem } from 'src/order-item/models/order-item.models';
import { User } from 'src/user/model/user.model';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: User;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  totalProduct: string;

  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentTypes)),
    defaultValue: PaymentTypes.CASH,
    allowNull: false,
  })
  paymentType: string;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.ACCEPTED,
    allowNull: false,
  })
  status: string;

  @HasMany(() => OrderItem)
  orderItem: OrderItem;
}
