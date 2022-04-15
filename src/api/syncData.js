import Base from "./Base.js";

export default class SyncDataAPI extends Base {
  getCities() {
    return this.apiClient.get("cities");
  }

  getKitchens() {
    return this.apiClient.get("kitchens");
  }

  getRoles() {
    return this.apiClient.get("rbac/roles");
  }

  getProductCategories() {
    return this.apiClient.get("product-categories");
  }

  getProductTypes() {
    return this.apiClient.get("product-types");
  }

  getPaymentTypes() {
    return this.apiClient.get("order-payment-types");
  }

  getStatuses() {
    return this.apiClient.get("order-statuses");
  }

  getTimeTypes() {
    return this.apiClient.get("order-types");
  }

  getItemsTypes() {
    return this.apiClient.get("order-items-statuses");
  }
}
