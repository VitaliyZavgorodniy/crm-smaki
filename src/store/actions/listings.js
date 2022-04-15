import api from "../../apiSingleton";

import {
  ACTIVE_ORDERS_CALLCENTER,
  ACTIVE_ORDERS_KITCHEN,
  ACTIVE_ORDERS_COOK,
  REJECTED_ORDERS_CALLCENTER,
  ACTIVE_ORDERS_COURIER,
} from "../constants/listings";

export function getAllActiveOrders(params = {}) {
  return async (dispatch) => {
    const { data: orders } = await api.listings.getAllActiveOrders({
      ...params
    });

    await dispatch({
      type: ACTIVE_ORDERS_CALLCENTER,
      payload: { orders },
    });
  };
}

export function getCouriersOrders() {
  return async (dispatch) => {
    const data = await api.listings.getCouriersOrders();

    await dispatch({
      type: ACTIVE_ORDERS_COURIER,
      payload: data,
    });
  };
}

export const getOrderItems = () => {
  return async (dispatch) => {
    const data = await api.listings.getOrderItems();
    console.log(data);

    await dispatch({
      type: ACTIVE_ORDERS_KITCHEN,
      payload: { data },
    });
  };
};
