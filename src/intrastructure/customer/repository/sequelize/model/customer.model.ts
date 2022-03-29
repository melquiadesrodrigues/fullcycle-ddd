import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

type CustomerAttributes = {
    id: string,
    name: string,
    street?: string,
    number?: number,
    zipcode?: string,
    city?: string,
    active: boolean,
    rewardPoints: number,
}

type CustomerCreationAttributes = CustomerAttributes;

// noinspection JSAnnotator
@Table({
    tableName: "customers",
    timestamps: false,
})
export default class CustomerModel extends Model<CustomerAttributes, CustomerCreationAttributes>{

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: true})
    declare street: string;

    @Column({allowNull: true})
    declare number: number;

    @Column({allowNull: true})
    declare zipcode: string;

    @Column({allowNull: true})
    declare city: string;

    @Column({allowNull: false})
    declare active: boolean;

    @Column({ allowNull: false })
    declare rewardPoints: number;
}