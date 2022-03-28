"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const orderItem_1 = __importDefault(require("./orderItem"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new order_1.default("", "123", [new orderItem_1.default("123", "p1", "Item1", 10, 2)]);
        }).toThrowError("Id is required");
    });
    it("should throw error when customer_id is empty", () => {
        expect(() => {
            let customer = new order_1.default("123", "", [new orderItem_1.default("123", "p1", "Item1", 10, 2)]);
        }).toThrowError("Customer is required");
    });
    it("should throw error when items is empty", () => {
        expect(() => {
            let customer = new order_1.default("123", "123", []);
        }).toThrowError("Items cannot be empty");
    });
    it("should calculate total", () => {
        const item1 = new orderItem_1.default("1", "p1", "Item1", 10, 1);
        const order1 = new order_1.default("1", "1", [item1]);
        const total1 = order1.total;
        expect(total1).toBe(10);
        const item2 = new orderItem_1.default("2", "p2", "Item2", 20, 2);
        const order2 = new order_1.default("1", "1", [item1, item2]);
        const total2 = order2.total;
        expect(total2).toBe(50);
    });
});
