import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.increasePrice(percentage);
        })
    }
}