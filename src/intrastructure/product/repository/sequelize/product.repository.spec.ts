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

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);
        product.changeName("Product 2");
        product.changePrice(200);
        await productRepository.update(product);

        const productModel = await ProductModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        });
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({rejectOnEmpty: false, where: {id: "1"}});

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it("should throw error when find a nonexistent product", async () => {
        const productRepository = new ProductRepository();

        await expect(async () => {
            await productRepository.find("5");
        }).rejects.toEqual("Product does not exist");
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        await productRepository.create(product1);
        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        const products = [product1, product2];

        expect(products).toEqual(foundProducts);
    });

    afterEach(async () => {
        await sequelize.close();
    });
});