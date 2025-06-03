import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/cart/models/cart.model';
import { Category } from 'src/categories/models/category.models';
import { UserRoles, UserStatus } from 'src/constants';
import { Order } from 'src/order/models/order.model';
import { Product } from 'src/products/models/product.models';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRoles)),
    allowNull: false,
  })
  role: UserRoles;

  @Column({
    type: DataType.FLOAT,
  })
  sellerRating: number;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
  })
  status: UserStatus;

  @HasMany(() => Order)
  order: Order[];

  @HasMany(() => Product)
  product: Product[];

  @HasMany(() => Cart)
  cart: Cart[];
}
