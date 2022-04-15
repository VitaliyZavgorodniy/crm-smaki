import produce from "immer";

import {
  ACTIVE_ORDERS_CALLCENTER,
  ACTIVE_ORDERS_KITCHEN,
  ACTIVE_ORDERS_COOK,
  REJECTED_ORDERS_CALLCENTER,
  ACTIVE_ORDERS_COURIER,
} from "../constants/listings";

const initialState = {
  orders: null,
  ordersCourier: [],
  ordersKitchen: null,
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTIVE_ORDERS_CALLCENTER: {
      draft.orders = payload.orders;
      break;
    }

    case ACTIVE_ORDERS_COURIER: {
      draft.ordersCourier = payload.data;
      break;
    }

    case ACTIVE_ORDERS_KITCHEN: {
      draft.ordersKitchen = payload.data;
      break;
    }

    default:
      break;
  }
}, initialState);
