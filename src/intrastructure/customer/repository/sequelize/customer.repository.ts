import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./model/customer.model";
import Address from "../../../../domain/customer/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address?.street,
            number: entity.Address?.number,
            zipcode: entity.Address?.zipcode,
            city: entity.Address?.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({rejectOnEmpty: true, where: {id}});
        } catch (e) {
            throw new Error("Customer does not exist");
        }
        return this.makeCustomer(customerModel);
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(customerModel => this.makeCustomer(customerModel));
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
                name: entity.name,
                street: entity.Address?.street,
                number: entity.Address?.number,
                zipcode: entity.Address?.zipcode,
                city: entity.Address?.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            },
            {
                where: {id: entity.id},
                returning: true
            })
    }

    private makeCustomer(customerModel: CustomerModel): Customer {
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.addRewardPoints(customerModel.rewardPoints);
        if (!customerModel.street || !customerModel.number || !customerModel.zipcode || !customerModel.city) {
            return customer;
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        );
        customer.changeAddress(address);

        if (customerModel.active === false) {
            return customer;
        }

        customer.activate();
        return customer;
    }

}