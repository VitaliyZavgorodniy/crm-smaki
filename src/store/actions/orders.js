import cloneDeep from "lodash.clonedeep";
import orders from "utils/validation/rules/orders";

import { getFiltet } from "utils/processingRequester/getLocalFilterOrders";

import { updateOrder } from "store/actions/order";
import { getAllActiveOrders } from "store/actions/listings";

import api from "../../apiSingleton";
import {
  GET_ITEMS_TYPES_SUCCESS,
  GET_ORDER_ITEMS_SUCCESS,
  GET_ORDERS_SUCCESS,
  GET_PAYMENTS_SUCCESS,
  GET_STATUSES_SUCCESS,
  GET_TYPES_SUCCESS,
  REMOVE_ACTIVE_ORDER,
  SET_ACTIVE_ORDER,
  SET_ACTIVE_ORDER_STATUS,
  UPDATE_SEARCH_QUERY,
  ORDER_UPDATE,
  ORDER_CREATE,
} from "../constants/orders";

export function orderCreate(order) {
  let client = {};

  if (!!order.client.id) client.id = order.client.id;
  client.source = order.client.source;
  client.name = order.client.name;
  client.phone = order.client.phone;

  const sendOrder = {
    restaurant: order.restaurant,
    kitchen_code: "kulparkivska",
    payment_type: "cash",
    change_from: order.change_from,
    type: order.type,
    status: "new",
    return_call: 0,
    client_comment: order.client_comment,
    client,
    delivered_till: order.delivered_till,
    address: {
      ...order.address,
      latitude: String(order.address.latitude),
      longitude: String(order.address.longitude),
    },
    items: order.items,
    payments: order.payments,
  };

  if (!order.client.id) delete sendOrder.client.id;

  return async (dispatch) => {
    const result = await api.orders.createOrder(sendOrder);

    if (!!result.data && !!result.data.id) {
      await dispatch(updateOrder(result.data));
      await dispatch(getAllActiveOrders(getFiltet));
    } else {
      console.error(result.errors);
    }
  };
}

export function orderUpdate(order) {
  const sendOrder = {
    restaurant: order.restaurant,
    kitchen_code: order.kitchen_code,
    payment_type: order.payment_type,
    change_from: "0",
    type: order.type,
    status: "cooking",
    return_call: order.return_call,
    client_comment: order.client_comment,
    delivered_till: order.delivered_till,
    address: {
      ...order.address,
      latitude: String(order.address.latitude),
      longitude: String(order.address.longitude),
    },
    items: order.items,
    payments: order.payments,
  };

  return async (dispatch) => {
    const result = await api.orders.updateOrder(order.id, sendOrder);

    if (!!result.data && !!result.data.id) {
      await dispatch(updateOrder(result.data));
      await dispatch(getAllActiveOrders(getFiltet));
    } else {
      console.error(result.errors);
    }
  };
}
// "The delivered till does not match the format Y-m-d H:i:s."
export function orderReject(order) {
  const sendOrder = {
    ...order,
    status: "rejected",
    type: "requested_time",
    courier_id: 22,
    delivered_till: "2021-11-22 19:08:03",
  };

  return async (dispatch) => {
    const result = await api.orders.updateOrder(order.id, sendOrder);

    if (!!result.data && !!result.data.id) {
      await dispatch(updateOrder(result.data));
      await dispatch(getAllActiveOrders(getFiltet));
    } else {
      console.error(result.errors);
    }
  };
}

export function initializeOrders() {
  return async (dispatch) => {
    dispatch(getOrders());
  };
}

export function getOrders() {
  return async (dispatch) => {
    const { data: orders } = await api.orders.getOrders();
    console.log(data);

    await dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: { orders },
    });
  };
}

export function getPaymentsTypes() {
  return async (dispatch) => {
    const { data: paymentTypes } = await api.orders.getPaymentTypes();

    await dispatch({
      type: GET_PAYMENTS_SUCCESS,
      payload: { paymentTypes },
    });
  };
}

export function getStatuses() {
  return async (dispatch) => {
    const { data: statuses } = await api.orders.getStatuses();

    await dispatch({
      type: GET_STATUSES_SUCCESS,
      payload: { statuses },
    });
  };
}

export function getTimeTypes() {
  return async (dispatch) => {
    const { data: timeTypes } = await api.orders.getTimeTypes();

    await dispatch({
      type: GET_TYPES_SUCCESS,
      payload: { timeTypes },
    });
  };
}

export function getItemsTypes() {
  return async (dispatch) => {
    const { data: itemsTypes } = await api.orders.getItemsTypes();

    await dispatch({
      type: GET_ITEMS_TYPES_SUCCESS,
      payload: { itemsTypes },
    });
  };
}

export function getOrderItems() {
  return async (dispatch) => {
    const { data: items } = await api.orders.getOrderItems();

    await dispatch({
      type: GET_ORDER_ITEMS_SUCCESS,
      payload: { items },
    });
  };
}

export function setActiveOrder(order) {
  return {
    type: SET_ACTIVE_ORDER,
    payload: { order },
  };
}

export function setActiveOrderStatus(status) {
  return {
    type: SET_ACTIVE_ORDER_STATUS,
    payload: { status },
  };
}

export function removeActiveOrder() {
  return { type: REMOVE_ACTIVE_ORDER };
}

export function updateItemComment(comment, itemId) {
  return async (dispatch, getState) => {
    const items = cloneDeep(getState().orders.items);
    const itemIndex = items.findIndex((el) => el.id === itemId);

    items[itemIndex].comment = comment;

    await dispatch({
      type: GET_ORDER_ITEMS_SUCCESS,
      payload: { items },
    });
  };
}

export function updateItem(id, status) {
  return async (dispatch) => {
    await api.orders.updateItem(id, status);
    await dispatch(getOrderItems());
  };
}

export function updateOrdersSearchQuery(value) {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: { value },
  };
}

export function startDelivery(terminal, orders) {
  return async () => {
    await api.orders.startDelivery(terminal, orders);
  };
}

export function completeDelivery(id, params) {
  return async () => {
    await api.orders.completeDelivery(id, params);
  };
}
