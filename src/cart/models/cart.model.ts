import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table ({tableName: 'cart'})
export class Cart extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userId: String

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    productId: Number

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    quantity: Number
}
