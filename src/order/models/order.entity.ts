import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:'orders'})
export class Order extends Model {
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    totalPrice:string


}
