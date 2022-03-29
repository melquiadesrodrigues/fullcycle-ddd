import {Sequelize} from "sequelize-typescript";
import CustomerModel from "./model/customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    const verifySavedModel = (customer: Customer, customerModel: CustomerModel) => {
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.Address?.street ?? null,
            number: customer.Address?.number ?? null,
            zipcode: customer.Address?.zipcode ?? null,
            city: customer.Address?.city ?? null,
        });
    }

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode", "City 1");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        verifySavedModel(customer, customerModel);
    });

    it("should update a customer without address", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        await customerRepository.create(customer);
        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        verifySavedModel(customer, customerModel);
    });

    it("should update a customer with address", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(new Address("Street 1", 1, "Zipcode", "City 1"));

        await customerRepository.create(customer);
        customer.changeName("Customer 2");
        customer.changeAddress(new Address("Street 2", 2, "Zipcode", "City 2"));
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        verifySavedModel(customer, customerModel);
    });

    it("should find a customer without address", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("1");

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should find a customer with address", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(new Address("Street 1", 1, "Zipcode", "City 1"));
        customer.activate();
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("1");

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should throw error when find a nonexistent customer", async () => {
        const customerRepository = new CustomerRepository();

        await expect(async () => {
            await customerRepository.find("5");
        }).rejects.toThrow("Customer does not exist");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        await customerRepository.create(customer1);
        const customer2 = new Customer("2", "Customer 2");
        customer2.changeAddress(new Address("Street 2", 2, "Zipcode", "City 2"));
        customer2.activate();
        await customerRepository.create(customer2);
        const customer3 = new Customer("3", "Customer 3");
        customer3.addRewardPoints(100);
        await customerRepository.create(customer3);
        const customers = [customer1, customer2, customer3];

        const foundCustomers = await customerRepository.findAll();

        expect(customers).toEqual(foundCustomers);
    });

    afterEach(async () => {
        await sequelize.close();
    });
});