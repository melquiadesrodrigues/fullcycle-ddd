import {Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import CustomerModel from "../../../../customer/repository/sequelize/model/customer.model";
import OrderItemModel from "./order-item.model";

type OrderAttributes = {
    id: string,
    customer_id: string,
    customer: CustomerModel,
    items: OrderItemModel[],
    total: number,
    paid: boolean
}

type OrderCreationAttributes = {
    id: string,
    customer_id: string,
    items: OrderItemModel[],
    total: number,
    paid: boolean
};

// noinspection JSAnnotator
@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;

    @Column({ allowNull: false })
    declare paid: boolean;
}