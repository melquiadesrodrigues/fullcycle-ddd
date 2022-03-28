export default class OrderItem {

    private readonly _id: string;
    private readonly _productId: string;
    private readonly _name: string;
    private readonly _price: number;
    private readonly _quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity

        this.validate();
    }

    private validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._productId.length === 0) {
            throw new Error("Product is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price <= 0) {
            throw new Error("Price must be greater than zero");
        }
        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price * this._quantity;
    }
}