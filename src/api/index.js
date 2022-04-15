import ApiClient from "./ApiClient";
import ClientsAPI from "./clients";
import OrdersAPI from "./orders";
import ProductsAPI from "./products";
import SessionAPI from "./session";
import StatisticAPI from "./statistic";
import SyncDataAPI from "./syncData";
import UserAPI from "./user";
import UsersAPI from "./users";
import ListingsAPI from "./listings";
import SettingsAPI from "./settings";

export default function apiConstruct({
  apiUrl,
  prefix,
  onError,
  onNetworkError,
}) {
  if (!apiUrl) {
    throw new Error("[apiUrl] required");
  }

  const apiClient = new ApiClient({
    apiUrl,
    prefix,
    onError,
    onNetworkError,
  });

  return {
    apiClient,
    session: new SessionAPI({ apiClient }),
    user: new UserAPI({ apiClient }),
    users: new UsersAPI({ apiClient }),
    statistic: new StatisticAPI({ apiClient }),
    syncData: new SyncDataAPI({ apiClient }),
    products: new ProductsAPI({ apiClient }),
    orders: new OrdersAPI({ apiClient }),
    clients: new ClientsAPI({ apiClient }),
    listings: new ListingsAPI({ apiClient }),
    settings: new SettingsAPI({ apiClient }),
  };
}
