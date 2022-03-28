"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("./domain/customer/entity/customer"));
const address_1 = __importDefault(require("./domain/customer/entity/address"));
const orderItem_1 = __importDefault(require("./domain/checkout/entity/orderItem"));
const order_1 = __importDefault(require("./domain/checkout/entity/order"));
let customer = new customer_1.default("123", "Melquíades Rodrigues");
const address = new address_1.default("Rua dois", 2, "12345-678", "São Paulo");
customer.changeAddress(address);
customer.activate();
const item1 = new orderItem_1.default("1", "p1", "Item 1", 10, 1);
const item2 = new orderItem_1.default("2", "p2", "Item 2", 20, 2);
const order = new order_1.default("1", "123", [item1, item2]);
