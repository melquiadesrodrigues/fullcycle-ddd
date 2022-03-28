"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../entity/order"));
const orderItem_1 = __importDefault(require("../entity/orderItem"));
const order_service_1 = __importDefault(require("./order.service"));
const customer_1 = __importDefault(require("../entity/customer"));
const address_1 = __importDefault(require("../entity/address"));
describe("Order service unit tests", () => {
    it("should throw error if items empty", () => {
        const customer = new customer_1.default("c1", "John");
        customer.changeAddress(new address_1.default("rua 1", 2, "123", "Goiânia"));
        customer.activate();
        expect(() => {
            const order = order_service_1.default.placeOrder(customer, []);
        }).toThrowError("Order must have at least one item");
    });
    it("should throw error if customer is inactive", () => {
        const customer = new customer_1.default("c1", "John");
        const item1 = new orderItem_1.default("i1", "p1", "p1", 100, 1);
        expect(() => {
            const order = order_service_1.default.placeOrder(customer, [item1]);
        }).toThrowError("Customer must be active to place order");
    });
    it("should place an order", () => {
        const customer = new customer_1.default("c1", "John");
        customer.changeAddress(new address_1.default("rua 1", 2, "123", "Goiânia"));
        customer.activate();
        const item1 = new orderItem_1.default("i1", "p1", "p1", 100, 2);
        const order = order_service_1.default.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(100);
        expect(order.customerId).toBe("c1");
        expect(order.items.length).toBe(1);
        expect(order.total).toBe(200);
    });
    it("should get total of all orders", () => {
        const orderItem1 = new orderItem_1.default("i1", "p1", "p1", 10, 1);
        const order1 = new order_1.default("o1", "c1", [orderItem1]);
        const orderItem2 = new orderItem_1.default("i2", "p2", "p2", 20, 2);
        const orderItem3 = new orderItem_1.default("13", "p3", "p3", 30, 3);
        const order2 = new order_1.default("o2", "c2", [orderItem2, orderItem3]);
        const total = order_service_1.default.total([order1, order2]);
        expect(total).toBe(140);
    });
});
