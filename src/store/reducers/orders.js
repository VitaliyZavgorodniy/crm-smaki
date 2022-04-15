import produce from "immer";

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
import { LOGOUT } from "../constants/session";

const initialState = {
  list: [],
  orderStatus: "create",
  paymentTypes: [],
  statuses: [],
  timeTypes: [],
  searchQuery: "",
  itemsTypes: [
    { name: "new", title: "Новый заказ" },
    { name: "in_process", title: "Готовится" },
    { name: "ready", title: "Приготовлен" },
  ],
  items: [],
  activeOrder: {
    restaurant: { value: "smaki", label: "Smaki Maki" },
    kitchen_code: { value: "kulparkivska", label: "Кульпаркiвська" },
    payment_type: { value: "online", label: "Онлайн" },
    change_from: 0,
    type: { value: "soon", label: "Ближайшее время" },
    status: { value: "new", label: "Новый заказ" },
    return_call: 0,
    courier_id: "",
    client_comment: "",
    client: {
      id: "",
      name: "",
      phone: { value: "", label: "" },
      source: { value: "website", label: "Сайт" },
    },
    address: {
      city_sync_id: { value: "lviv", label: "Львов" },
      street: "",
      house_number: "",
      entrance: "",
      floor: "",
      comment: "",
      comment_to_administrator: "",
      comment_to_courier: "",
    },
    items: [],
  },
};

export default produce((draft, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case ORDER_CREATE: {
      break;
    }

    case ORDER_UPDATE: {
      break;
    }

    case GET_ORDERS_SUCCESS: {
      draft.list = payload.orders;
      break;
    }

    case GET_PAYMENTS_SUCCESS: {
      draft.paymentTypes = payload.paymentTypes;
      break;
    }

    case GET_STATUSES_SUCCESS: {
      draft.statuses = payload.statuses;
      break;
    }

    case GET_TYPES_SUCCESS: {
      draft.timeTypes = payload.timeTypes;
      break;
    }

    case GET_ITEMS_TYPES_SUCCESS: {
      draft.itemsTypes = payload.itemsTypes || initialState.itemsTypes;
      break;
    }

    case GET_ORDER_ITEMS_SUCCESS: {
      draft.items = payload.items;
      break;
    }

    case SET_ACTIVE_ORDER: {
      draft.activeOrder = payload.order;
      break;
    }

    case SET_ACTIVE_ORDER_STATUS: {
      draft.orderStatus = payload.status;
      break;
    }

    case REMOVE_ACTIVE_ORDER: {
      draft.activeOrder = initialState.activeOrder;
      break;
    }

    case UPDATE_SEARCH_QUERY: {
      draft.searchQuery = payload.value;
      break;
    }

    case LOGOUT: {
      draft.activeOrder = initialState.activeOrder;
      draft.list = initialState.list;
      break;
    }

    default: {
      break;
    }
  }
}, initialState);
