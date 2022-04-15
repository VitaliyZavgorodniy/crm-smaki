import {
  UPDATE_ORDER,
  UPDATE_ORDER_DATA,
  UPDATE_ORDER_CLIENT,
  UPDATE_ORDER_ADDRESS,
  UPDATE_ORDER_ITEMS,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  INCREASE_ORDER_ITEM_QUANTITY,
  DECREASE_ORDER_ITEM_QUANTITY,
  UPDATE_ORDER_ITEM_COMMENT,
  UPDATE_ORDER_PAYMENTS,
  ADD_ORDER_PAYMENTS,
  REMOVE_ORDER_PAYMENTS,
  RESET_ORDER,
} from "../constants/order";

export function updateOrder(data) {
  return {
    type: UPDATE_ORDER,
    payload: data,
  };
}

export function updateOrderData(item, data) {
  return {
    type: UPDATE_ORDER_DATA,
    payload: { item, data },
  };
}

export function updateOrderClient(item, data) {
  return {
    type: UPDATE_ORDER_CLIENT,
    payload: { item, data },
  };
}

export function updateOrderAddress(item, data) {
  return {
    type: UPDATE_ORDER_ADDRESS,
    payload: { item, data },
  };
}

export function updateOrderItems(item, data) {
  return {
    type: UPDATE_ORDER_ITEMS,
    payload: { item, data },
  };
}

export function addOrderItem(data) {
  return {
    type: ADD_ORDER_ITEM,
    payload: { data },
  };
}

export function removeOrderItem(data) {
  return {
    type: REMOVE_ORDER_ITEM,
    payload: { data },
  };
}

export function increaseOrderItem(data, value) {
  return {
    type: INCREASE_ORDER_ITEM_QUANTITY,
    payload: { data, value },
  };
}

export function decreaseOrderItem(data, value) {
  return {
    type: DECREASE_ORDER_ITEM_QUANTITY,
    payload: { data, value },
  };
}

export function updateOrderItemComment(item, data) {
  return {
    type: UPDATE_ORDER_ITEM_COMMENT,
    payload: { item, data },
  };
}

export function updateOrderPayments(item, data) {
  return {
    type: UPDATE_ORDER_PAYMENTS,
    payload: { item, data },
  };
}

export function addOrderPayments(item, data) {
  return {
    type: ADD_ORDER_PAYMENTS,
    payload: { item, data },
  };
}

export function removeOrderPayments(item) {
  return {
    type: REMOVE_ORDER_PAYMENTS,
    payload: { item },
  };
}

export function resetOrder() {
  return {
    type: RESET_ORDER,
  };
}
