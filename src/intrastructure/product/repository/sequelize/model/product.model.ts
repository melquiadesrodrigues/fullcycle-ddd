import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

type ProductAttributes = {
    id: string,
    name: string,
    price: number
}

type ProductCreationAttributes = ProductAttributes;

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model<ProductAttributes, ProductCreationAttributes>{

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}