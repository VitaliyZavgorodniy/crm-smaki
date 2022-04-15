import Base from "./Base.js";

export default class StatisticAPI extends Base {
    getDeliveries(params) {
    return this.apiClient.get("olap/deliveries", params);
  }

  getDistances(params) {
    return this.apiClient.get("olap/distances", params);
  }
}