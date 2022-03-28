import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/entity/address";
import OrderItem from "./domain/checkout/entity/orderItem";
import Order from "./domain/checkout/entity/order";

let customer = new Customer("123", "Melquíades Rodrigues");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "p1", "Item 1", 10, 1);
const item2 = new OrderItem("2", "p2", "Item 2", 20, 2);
const order = new Order("1", "123", [item1, item2]);

