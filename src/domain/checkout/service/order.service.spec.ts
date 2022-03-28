import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";
import Customer from "../../customer/entity/customer";
import Address from "../../customer/entity/address";

describe("Order service unit tests", () => {

    it("should throw error if items empty", () => {
        const customer = new Customer("c1", "John");
        customer.changeAddress(new Address("rua 1", 2, "123", "Goiânia"));
        customer.activate();

        expect(() => {
            const order = OrderService.placeOrder(customer, []);
        }).toThrowError("Order must have at least one item");
    });

    it("should throw error if customer is inactive", () => {
        const customer = new Customer("c1", "John");
        const item1 = new OrderItem("i1", "p1", "p1", 100, 1);

        expect(() => {
            const order = OrderService.placeOrder(customer, [item1]);
        }).toThrowError("Customer must be active to place order");
    });

    it("should place an order", () => {
        const customer = new Customer("c1", "John");
        customer.changeAddress(new Address("rua 1", 2, "123", "Goiânia"));
        customer.activate();
        const item1 = new OrderItem("i1", "p1", "p1", 100, 2);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.customerId).toBe("c1");
        expect(order.items.length).toBe(1);
        expect(order.total).toBe(200)
    });

    it("should get total of all orders", () => {
        const orderItem1 = new OrderItem("i1", "p1", "p1", 10, 1);
        const order1 = new Order("o1", "c1", [orderItem1]);


        const orderItem2 = new OrderItem("i2", "p2", "p2", 20, 2);
        const orderItem3 = new OrderItem("13", "p3", "p3", 30, 3);
        const order2 = new Order("o2", "c2", [orderItem2, orderItem3]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(140);
    });

})