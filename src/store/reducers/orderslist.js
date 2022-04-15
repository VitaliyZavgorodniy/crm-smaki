import produce from "immer";

import { FETCH_ORDERS } from "../constants/orderslist";

const initialState = {
  orders: null,
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case FETCH_ORDERS: {
      draft.orders = payload.orders;
      break;
    }

    default:
      break;
  }
}, initialState);
