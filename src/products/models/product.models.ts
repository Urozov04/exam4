import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Category } from "src/categories/models/category.models"

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
    
    // @Column({
    //     type: DataType.INTEGER,
    // })
    // sellerId: number

    @Column ({
        type: DataType.INTEGER
    })
    rating: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId: number

    @BelongsTo(() => Category, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    category: Category;
}