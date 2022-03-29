import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Order("", "123", [new OrderItem("123", "p1", "Item1", 10, 2)]);
        }).toThrowError("Id is required");
    });

    it("should throw error when customer_id is empty", () => {
        expect(() => {
            let customer = new Order("123", "", [new OrderItem("123", "p1", "Item1", 10, 2)]);
        }).toThrowError("Customer is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let customer = new Order("123", "123", []);
        }).toThrowError("Items cannot be empty");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "p1", "Item1", 10, 1);
        const order1 = new Order("1", "1", [item1]);

        const total1 = order1.total;

        expect(total1).toBe(10);

        const item2 = new OrderItem("2", "p2", "Item2", 20, 2);
        const order2 = new Order("1", "1", [item1, item2]);

        const total2 = order2.total;

        expect(total2).toBe(50);
    });

    it("should paid", () => {
        const item1 = new OrderItem("1", "p1", "Item1", 10, 1);
        const order1 = new Order("1", "1", [item1]);
        order1.pay();

        const paid = order1.paid

        expect(paid).toBe(true);
    });

});