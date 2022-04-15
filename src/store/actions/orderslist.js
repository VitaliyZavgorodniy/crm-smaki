// import cloneDeep from "lodash.clonedeep";

import api from "../../apiSingleton";
import { FETCH_ORDERS } from "../constants/orderslist";

export function getOrdersCallcenter() {
  return async (dispatch) => {
    dispatch(fetchCallcenterOrders());
    // dispatch(getPaymentsTypes());
    // dispatch(getStatuses());
    // dispatch(getTimeTypes());
    // dispatch(getItemsTypes());
  };
}

export function fetchCallcenterOrders() {
  return async (dispatch) => {
    const { data: orders } = await api.orders.getCallcenterOrders();

    await dispatch({
      type: FETCH_ORDERS,
      payload: { orders },
    });
  };
}