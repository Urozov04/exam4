import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/models/product.models';
import { User } from 'src/user/model/user.model';

@Table({ tableName: 'cart' })
export class Cart extends Model {
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  // @Column({
  //   type: DataType.BIGINT,
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
}
