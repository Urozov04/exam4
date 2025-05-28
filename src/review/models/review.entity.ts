import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Rating } from "src/constants";

@Table({tableName:'review'})
export class Review extends Model {
    @Column({
        type: DataType.ENUM(...Object.values(Rating)),
        defaultValue: Rating.VERY_GOOD,
        allowNull:false
    })
    rating: Rating

    @Column({
        type:DataType.TEXT,
        allowNull:false
    })
    comment:string

    // @ForeignKey(()=>ProductId)
    // @Column({
    //      type:DataType.INTEGER,
    //      allowNull:false
    // })
    // productId:number

    // @ForeignKey(()=>UserId)
    // @Column({
    //     type:DataType.INTEGER,
    //     allowNull:false
    // })
    // userId:number

}
