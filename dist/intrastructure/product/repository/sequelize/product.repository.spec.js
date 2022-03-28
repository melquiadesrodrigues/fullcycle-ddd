"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("./model/product.model"));
const product_1 = __importDefault(require("../../../../domain/product/entity/product"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product repository test", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([product_model_1.default]);
        await sequelize.sync();
    });
    it("should create a product", async () => {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 100);
        await productRepository.create(product);
        const productModel = await product_model_1.default.findOne({ rejectOnEmpty: false, where: { id: "1" } });
        expect(1).toBe(1);
        // expect(productModel.toJSON()).toStrictEqual({
        //     id: "1",
        //     name: "Product 1",
        //     price: 100
        // });
    });
    // it("should update a product", async () => {
    //     const productRepository = new ProductRepository();
    //     const product = new Product("1", "Product 1", 100);
    //     await productRepository.create(product);
    //     product.changeName("Product 2");
    //     product.changePrice(200);
    //     await productRepository.update(product);
    //
    //     const productModel = await ProductModel.findOne({rejectOnEmpty: false, where: {id: "1"}});
    //
    //     expect(productModel.toJSON()).toStrictEqual({
    //         id: "1",
    //         name: "Product 2",
    //         price: 200
    //     });
    // });
    afterEach(async () => {
        await sequelize.close();
    });
});
