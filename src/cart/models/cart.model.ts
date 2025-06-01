import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cart' })
export class Cart extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  productId: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  quantity: number;
}
