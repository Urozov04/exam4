import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Product } from 'src/products/models/product.models';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  discription: string;

  @HasMany(() => Product)
  product: Product[];
}
