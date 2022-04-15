import { combineReducers } from "redux";

import clients from "./clients";
import orders from "./orders";
import products from "./products";
import session from "./session";
import statistic from "./statistic";
import syncData from "./syncData";
import user from "./user";
import users from "./users";
import view from "./view";
import orderslist from "./orderslist";
import modals from "./modals";
import order from "./order";
import listings from "./listings";
import settings from "./settings";

export default combineReducers({
  session,
  user,
  users,
  view,
  orders,
  statistic,
  syncData,
  products,
  clients,
  orderslist,
  modals,
  order,
  listings,
  settings,
});
