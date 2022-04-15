import { connect } from "react-redux";

import * as clientsActions from "../../store/actions/clients";
import * as ordersActions from "../../store/actions/orders";
import * as viewActions from "../../store/actions/view";
import { ordersWithSearchSelector } from "../../selectors/orders";
import { userSelector } from "../../selectors/user";
import { default as OrdersPage } from "./OrdersPage";

function mapStateToProps(state) {
  const { list, items } = ordersWithSearchSelector(state);
  const { statuses, itemsTypes } = state.orders;
  const adminOrders = {
    new: {},
    cooking: {},
    preparing: {},
    for_delivery: {},
    closed: {},
    rejected: {},
  };

  const cookOrders = {
    ready: {},
    new: {},
  };

  statuses.forEach((el) => {
    adminOrders[el.name].title = el.title;
    adminOrders[el.name].list = [];
  });

  itemsTypes.forEach((el) => {
    if (cookOrders[el.name]) {
      cookOrders[el.name].title = el.title;
      cookOrders[el.name].list = [];
    }
  });

  list.forEach((el) => adminOrders[el.status]?.list?.push(el));
  items.forEach((el) => cookOrders[el.status]?.list?.push(el));

  return {
    adminOrders,
    orders: list,
    items: cookOrders,
    statuses: state.orders.statuses,
    kitchens: state.settings.kitchens,
    cities: state.settings.cities,
    sources: state.clients.sources,
    timeTypes: state.orders.timeTypes,
    paymentTypes: state.orders.paymentTypes,
    user: userSelector(state),
  };
}

const mapDispatchToProps = {
  ...ordersActions,
  ...clientsActions,
  ...viewActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
