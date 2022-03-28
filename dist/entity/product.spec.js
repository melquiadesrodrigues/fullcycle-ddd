"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new product_1.default("", "Product 1", 100);
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new product_1.default("1", "", 100);
        }).toThrowError("Name is required");
    });
    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new product_1.default("1", "Product 1", 0);
        }).toThrowError("Price must be greater than zero");
    });
    it("should throw error when try change name to empty", () => {
        const product = new product_1.default("1", "Product1", 100);
        expect(() => {
            product.changeName("");
        }).toThrowError("Name is required");
    });
    it("should change name", () => {
        const product = new product_1.default("1", "Product1", 100);
        product.changeName("Product 1");
        expect(product.name).toBe("Product 1");
    });
    it("should throw error when try change price to less than zero", () => {
        const product = new product_1.default("1", "Product1", 100);
        expect(() => {
            product.changePrice(-1);
        }).toThrowError("Price must be greater than zero");
    });
    it("should change price", () => {
        const product = new product_1.default("1", "Product1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });
});
