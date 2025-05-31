import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table({tableName: 'categories'})
export class Category extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    discription: string
}
