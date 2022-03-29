import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(props: OrderFactoryProps): Order {
        const items = props.items.map((item) =>
            new OrderItem(item.id, item.productId, item.name, item.price, item.quantity)
        );
        return new Order(props.id, props.customerId, items);
    }
}