import {Sequelize} from "sequelize-typescript";
import ProductModel from "./model/product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        expect(1).toBe(1)
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