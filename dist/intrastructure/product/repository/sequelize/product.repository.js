"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./model/product.model"));
class ProductRepository {
    async create(entity) {
        await product_model_1.default.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }
    find(id) {
        return Promise.resolve(undefined);
    }
    findAll() {
        return Promise.resolve([]);
    }
    async update(entity) {
        await product_model_1.default.update({
            name: entity.name,
            price: entity.price,
        }, {
            where: {
                id: entity.id
            }, returning: true
        });
    }
}
exports.default = ProductRepository;
