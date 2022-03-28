"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._items = [];
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
        this._total = this.calcTotal();
    }
    get id() {
        return this._id;
    }
    get customerId() {
        return this._customerId;
    }
    get items() {
        return this._items;
    }
    get total() {
        return this._total;
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("Customer is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items cannot be empty");
        }
    }
    calcTotal() {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}
exports.default = Order;
