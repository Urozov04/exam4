import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({tableName:'orders'})
export class Order extends Model {
    @Column({
        type:DataType.DECIMAL,
        allowNull:false,
    })
    totalPrice:number

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    totalProduct:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    address:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    paymentType:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    status:string

    // @ForeignKey(()=>UserId)
    // @Column({
    //     type:DataType.INTEGER,
    //     allowNull:false
    // })
    // userId:number

}
