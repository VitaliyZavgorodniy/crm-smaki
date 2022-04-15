import produce from "immer";

import { LOGOUT } from "../constants/session";
import {
  UPDATE_CITIES,
  UPDATE_KITCHENS,
  UPDATE_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_TYPES,
  UPDATE_ROLES,
  UPDATE_PAYMENT_TYPES,
  UPDATE_STATUSES,
  UPDATE_TIME_TYPES,
  UPDATE_ITEMS_TYPES,
} from "../constants/syncData";

const initialState = {
  cities: null,
  kitchens: null,
  roles: null,
  productCategories: null,
  productTypes: null,
  paymentTypes: null,
  statuses: null,
  timeTypes: null,
  itemsTypes: null,
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_CITIES: {
      draft.cities = payload.cities;
      break;
    }

    case UPDATE_KITCHENS: {
      draft.kitchens = payload.kitchens;
      break;
    }

    case UPDATE_ROLES: {
      draft.roles = payload.roles;
      break;
    }

    case UPDATE_PRODUCT_CATEGORIES: {
      draft.productCategories = payload.productCategories;
      break;
    }

    case UPDATE_PRODUCT_TYPES: {
      draft.productTypes = payload.productTypes;
      break;
    }

    case UPDATE_PAYMENT_TYPES: {
      draft.paymentTypes = payload.paymentTypes;
      break;
    }

    case UPDATE_STATUSES: {
      draft.statuses = payload.statuses;
      break;
    }

    case UPDATE_TIME_TYPES: {
      draft.timeTypes = payload.timeTypes;
      break;
    }
    case UPDATE_ITEMS_TYPES: {
      draft.itemsTypes = payload.itemsTypes;
      break;
    }

    case LOGOUT: {
      draft.cities = null;
      draft.kitchens = null;
      draft.roles = null;
      draft.productCategories = null;
      draft.productTypes = null;
      draft.paymentTypes = null;
      draft.statuses = null;
      draft.timeTypes = null;
      draft.itemsTypes = null;
      break;
    }

    default:
      break;
  }
}, initialState);
