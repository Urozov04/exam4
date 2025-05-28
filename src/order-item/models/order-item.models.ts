import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table ({tableName: 'order-item'})
export class OrderItem extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    productId: String
    
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    quantity: Number

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    totalPrice: Number

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    orderId: Number

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    cartId: Number
}
