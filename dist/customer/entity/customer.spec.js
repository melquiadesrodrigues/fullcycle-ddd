"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./customer"));
const address_1 = __importDefault(require("./address"));
describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("should throw error when try change name to empty", () => {
        const customer = new customer_1.default("123", "John");
        expect(() => {
            customer.changeName("");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        // Arrange
        const customer = new customer_1.default("123", "John");
        // Act
        customer.changeName("Jane");
        // Assert
        expect(customer.name).toBe("Jane");
    });
    it("should throw error when try active customer without address", () => {
        const customer = new customer_1.default("123", "John");
        expect(() => {
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
    it("should activate customer", () => {
        // Arrange
        const customer = new customer_1.default("123", "John");
        customer.changeAddress(new address_1.default("rua 2", 2, "123", "Goiânia"));
        // Act
        customer.activate();
        // Assert
        expect(customer.isActive()).toBeTruthy();
    });
    it("should deactivate customer", () => {
        // Arrange
        const customer = new customer_1.default("123", "John");
        customer.changeAddress(new address_1.default("rua 2", 2, "123", "Goiânia"));
        customer.activate();
        // Act
        customer.deactivate();
        // Assert
        expect(customer.isActive()).toBeFalsy();
    });
    it("should add reward points", () => {
        const customer = new customer_1.default("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
