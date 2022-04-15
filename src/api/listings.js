import Base from "./Base.js";

export default class ListingsAPI extends Base {
  getOrders(params) {
    return this.apiClient.get("orders", params);
  }

  getAllActiveOrders(params) {
    return this.apiClient.get("orders", params);
  }

  createOrder(order) {
    return this.apiClient.post("orders", order);
  }

  updateOrder(id, order) {
    return this.apiClient.put(`orders/${id}`, order);
  }

  getOrderItems() {
    return this.apiClient.get("order-items");
  }

  updateItem(id, status) {
    return this.apiClient.patch(`order-items/${id}`, status);
  }

  getCouriersOrders() {
    return this.apiClient.get("mobile/orders");
  }
}
