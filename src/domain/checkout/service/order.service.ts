import Order from "../entity/order";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/orderItem";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {

        if(items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        if(!customer.isActive()) {
            throw new Error("Customer must be active to place order");
        }

        const order = new Order(uuid(), customer.id, items);

        customer.addRewardPoints(order.total/2);

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total, 0)
    }

}