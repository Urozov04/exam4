import { Column, DataType, Model, Table } from "sequelize-typescript"

@Table ({tableName: 'products'})
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number

    @Column({
        type: DataType.STRING,
    })
    description: string

    // @Column({
    //     type: DataType.STRING,
    // })
    // picture: string
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity: number
}