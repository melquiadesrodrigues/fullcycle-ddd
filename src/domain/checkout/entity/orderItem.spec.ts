import OrderItem from "./orderItem";


describe("OrderItem unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new OrderItem("", "p1", "Item 1", 100, 1);
        }).toThrowError("Id is required");
    });

    it("should throw error when productId is empty", () => {
        expect(() => {
            const product = new OrderItem("1", "", "Item 1", 100, 1);
        }).toThrowError("Product is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new OrderItem("1", "p1", "", 100, 1);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new OrderItem("1", "p1", "Item 1", 0, 1);
        }).toThrowError("Price must be greater than zero");
        expect(() => {
            const product = new OrderItem("1", "p1", "Item 1", -1, 1);
        }).toThrowError("Price must be greater than zero");
    });

    it("should throw error when quantity is less than zero", () => {
        expect(() => {
            const product = new OrderItem("1", "p1", "Item 1", 10, 0);
        }).toThrowError("Quantity must be greater than zero");
        expect(() => {
            const product = new OrderItem("1", "p1", "Item 1", 10, -1);
        }).toThrowError("Quantity must be greater than zero");
    });

});