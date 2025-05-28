import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({tableName:'review'})
export class Review extends Model {
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    rating:string

    @Column({
        type:DataType.TEXT,
        allowNull:false
    })
    comment:string

}
