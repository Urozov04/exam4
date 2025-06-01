import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderStatus, PaymentTypes } from 'src/constants';

@Table({ tableName: 'orders' })
export class Order extends Model {
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  customerId: number;

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
}
