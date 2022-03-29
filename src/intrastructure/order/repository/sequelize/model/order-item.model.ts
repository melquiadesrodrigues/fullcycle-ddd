import {Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo} from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../../../product/repository/sequelize/model/product.model";

type OrderItemAttributes = {
    id: string,
    product_id: string,
    product: ProductModel,
    order_id: string,
    order: OrderModel,
    quantity: number,
    name: string,
    price: number,
}

type OrderItemCreationAttributes = {
    id: string,
    name: string,
    price: number,
    product_id: string,
    quantity: number,
};

// noinspection JSAnnotator
@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model<OrderItemAttributes, OrderItemCreationAttributes> {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;
}