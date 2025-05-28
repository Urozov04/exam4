import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserRoles, UserStatus } from 'src/constants';

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
    allowNull: false,
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
}
