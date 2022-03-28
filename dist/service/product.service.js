"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    static increasePrice(products, percentage) {
        products.forEach(product => {
            product.increasePrice(percentage);
        });
    }
}
exports.default = ProductService;
