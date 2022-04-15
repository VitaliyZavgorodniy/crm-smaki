import Base from "./Base.js";

export default class SettingsAPI extends Base {
  getCities() {
    // console.log("gettings getCities");
    return this.apiClient.get("cities");
  }

  getKitchens() {
    // console.log("gettings getKitchens");
    return this.apiClient.get("kitchens");
  }

  getLocations() {
    // console.log("gettings getLocations");
    return this.apiClient.get("locations");
  }

  getClientSources() {
    // console.log("gettings getClientSources");
    return this.apiClient.get("sources");
  }

  getPaymentTypes() {
    // console.log("gettings getPaymentTypes");
    return this.apiClient.get("order-payment-types");
  }

  getOrderStatuses() {
    // console.log("gettings getOrderStatuses");
    return this.apiClient.get("order-statuses");
  }

  getOrderTypes() {
    // console.log("gettings getOrderTypes");
    return this.apiClient.get("order-types");
  }

  getItemsTypes() {
    // console.log("gettings getItemsTypes");
    return this.apiClient.get("order-items-statuses");
  }

  getProductCategories() {
    // console.log("gettings getProductCategories");
    return this.apiClient.get("product-categories");
  }

  getProductTypes() {
    // console.log("gettings getProductTypes");
    return this.apiClient.get("product-types");
  }

  getRoles() {
    // console.log("gettings getRoles");
    return this.apiClient.get("rbac/roles");
  }
}
