import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/models/order.model';
import { Product } from 'src/products/models/product.models';

@Table({ tableName: 'order-item' })
export class OrderItem extends Model {
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // productId: number;

  @ForeignKey(() => Product)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    productId: number;
  
    @BelongsTo(() => Product, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    product: Product;

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

  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // orderId: number;

  @ForeignKey(() => Order)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    orderId: number;
  
    @BelongsTo(() => Order, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    order: Order;
}
