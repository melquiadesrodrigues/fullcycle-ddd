import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./model/order.model";
import OrderItemModel from "./model/order-item.model";
import OrderItem from "../../../../domain/checkout/entity/orderItem";

export default class OrderRepository {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total,
                paid: entity.paid,
                items: entity.items.map((item) => ({
                    id: item.id,
                    product_id: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                } as OrderItemModel)),
            },
            {
                include: [{model: OrderItemModel}],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                paid: entity.paid,
            },
            {
                where: {id: entity.id},
                returning: true,
            }
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {id},
                include: ["items"],
                rejectOnEmpty: true,
            });
        } catch (e) {
            throw new Error("Order does not exist");
        }
        return this.makeOrder(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({include: ["items"]});
        return ordersModel.map(orderModel => this.makeOrder(orderModel));
    }

    private makeOrder(orderModel: OrderModel): Order {
        const items = orderModel.items.map(itemModel =>
            new OrderItem(itemModel.id, itemModel.product_id, itemModel.name, itemModel.price, itemModel.quantity)
        )
        const order = new Order(orderModel.id, orderModel.customer_id, items);
        if (orderModel.paid) {
            order.pay();
        }
        return order;
    }
}