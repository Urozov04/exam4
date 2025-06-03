import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/models/cart.model';
import { Category } from 'src/categories/models/category.models';
import { OrderItem } from 'src/order-item/models/order-item.models';
import { User } from 'src/user/model/user.model';

@Table({ tableName: 'products' })
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  // @Column({
  //     type: DataType.STRING,
  // })
  // picture: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sellerId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  seller: User;

  @Column({
    type: DataType.INTEGER,
  })
  rating: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @HasMany(() => OrderItem)
  orderItem: OrderItem;

  @HasMany(() => Cart)
  cart: Cart;
}
