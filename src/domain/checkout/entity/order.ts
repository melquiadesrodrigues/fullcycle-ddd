import OrderItem from "./orderItem";

export default class Order {
    private readonly _id: string;
    private readonly _customerId: string;
    private readonly _items: OrderItem[] = [];
    private readonly _total: number;
    private _paid: boolean = false;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;

        this.validate();
        this._total = this.calcTotal();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get total(): number {
        return this._total;
    }

    get paid(): boolean {
        return this._paid
    }

    pay(): void {
        this._paid = true;
    }

    private validate() {
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

    private calcTotal(): number {
        return this._items.reduce((acc: number, item: OrderItem) => acc + item.total, 0)
    }
}