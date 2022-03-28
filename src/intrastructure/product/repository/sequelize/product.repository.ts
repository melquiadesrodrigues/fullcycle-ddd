import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }

    find(id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve([]);
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
                name: entity.name,
                price: entity.price,
            },
            {
                where: {
                    id: entity.id
                }, returning: true
            })
    }

}