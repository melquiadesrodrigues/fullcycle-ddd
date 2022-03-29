import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/model/customer.model";
import OrderModel from "./model/order.model";
import OrderItemModel from "./model/order-item.model";
import ProductModel from "../../../product/repository/sequelize/model/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/entity/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    const createProduct = async (id: string, name: string, price: number): Promise<Product> => {
        const productRepository = new ProductRepository();
        const product = new Product(id, name, price);
        await productRepository.create(product);
        return product;
    }

    const createCustomer = async (
        id: string,
        name: string,
        street: string,
        number: number,
        zipcode: string,
        city: string
    ): Promise<Customer> => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer(id, name);
        const address = new Address(street, number, zipcode, city);
        customer.changeAddress(address);
        await customerRepository.create(customer);
        return customer;
    }

    const createOrder = async (): Promise<Order> => {
        const customer = await createCustomer("123", "Customer 1", "Street 1", 1, "Zipcode 1", "City 1");
        const product = await createProduct("123", "Product 1", 10);
        const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        return order;
    }

    const verifySavedModel = (order: Order, orderModel: OrderModel) => {
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            paid: order.paid,
            items: [
                {
                    id: order.items[0].id,
                    name: order.items[0].name,
                    price: order.items[0].price,
                    quantity: order.items[0].quantity,
                    order_id: order.id,
                    product_id: order.items[0].productId,
                },
            ],
        });
    }

    it("should create a new order", async () => {
        const order = await createOrder();

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
            rejectOnEmpty: true
        });

        verifySavedModel(order, orderModel);
    });

    it("should update order", async () => {
        const order = await createOrder();
        order.pay();

        const orderRepository = new OrderRepository();
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
            rejectOnEmpty: true
        });

        verifySavedModel(order, orderModel);
    });

    it("should find a order", async () => {
        const order = await createOrder();

        const orderRepository = new OrderRepository();
        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it("should throw error when find a nonexistent order", async () => {
        const orderRepository = new OrderRepository();
        await expect(async () => {
            await orderRepository.find("ASD7FSD");
        }).rejects.toThrow("Order does not exist");
    });

    it("should find all orders", async () => {
        const customer1 = await createCustomer("1", "Customer 1", "Street 1", 1, "Zipcode 1", "City 1");
        const product1 = await createProduct("1", "Product 1", 10);
        const orderItem1 = new OrderItem("1", product1.id, product1.name, product1.price, 2);
        const order1 = new Order("1", customer1.id, [orderItem1]);

        const customer2 = await createCustomer("2", "Customer 2", "Street 2", 2, "Zipcode 2", "City 2");
        const product2 = await createProduct("2", "Product 2", 20);
        const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 2);
        const order2 = new Order("2", customer2.id, [orderItem2]);

        const customer3 = await createCustomer("3", "Customer 3", "Street 3", 3, "Zipcode 3", "City 3");
        const product3 = await createProduct("3", "Product 3", 30);
        const orderItem3 = new OrderItem("3", product3.id, product3.name, product3.price, 3);
        const order3 = new Order("3", customer3.id, [orderItem3]);

        const orders = [order1, order2, order3];

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        await orderRepository.create(order3);

        const foundOrders = await orderRepository.findAll();

        expect(orders).toEqual(foundOrders);
    });

    afterEach(async () => {
        await sequelize.close();
    });

});