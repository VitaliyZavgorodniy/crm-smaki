import Base from "./Base.js";

export default class OrdersAPI extends Base {
  getOrders(params) {
    return this.apiClient.get("orders", params);
  }

  getCallcenterOrders() {
    return this.apiClient.get("orders");
  }

  getOrderItems() {
    return this.apiClient.get("order-items");
  }

  createOrder(order) {
    return this.apiClient.post("orders", order);
  }

  updateOrder(id, order) {
    return this.apiClient.put(`orders/${id}`, order);
  }

  updateItem(id, status) {
    return this.apiClient.patch(`order-items/${id}`, status);
  }

  startDelivery(delivery_terminal_id, orders) {
    console.log({ delivery_terminal_id, orders });
    return this.apiClient.post(`mobile/deliveries`, {
      delivery_terminal_id,
      orders,
    });
  }

  completeDelivery(order_uuid, params) {
    return this.apiClient.patch(`mobile/orders/${order_uuid}`, {
      restaurant: params.restaurant,
      latitude: "none",
      longitude: "none",
    });
  }
}
