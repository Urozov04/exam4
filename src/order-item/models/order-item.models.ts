import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'order-item' })
export class OrderItem extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;
}
