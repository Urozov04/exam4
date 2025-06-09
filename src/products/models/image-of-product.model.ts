import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.models";

@Table({tableName:'images-of-admin'})
export class ImagesOfProduct extends Model{
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    image_url:string

    @ForeignKey(()=>Product)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    product_id:number

    @BelongsTo(()=>Product)
    product:Product
}

