import produce from "immer";

import { LOGOUT } from "../constants/session";
import {
  UPDATE_SETTINGS_DATA,
  UPDATE_SETTINGS_CITIES_LIST,
  UPDATE_SETTINGS_KITCHENS_LIST,
  UPDATE_SETTINGS_LOCATIONS_LIST,
  UPDATE_SETTINGS_CLIENT_SOURCES,
  UPDATE_SETTINGS_PAYMENT_TYPES,
  UPDATE_SETTINGS_ORDER_STATUSES,
  UPDATE_SETTINGS_ORDER_TYPES,
  UPDATE_SETTINGS_ITEMS_STATUSES,
  UPDATE_SETTINGS_PRODUCT_CATEGORIES,
  UPDATE_SETTINGS_PRODUCT_TYPES,
  UPDATE_SETTINGS_ROLES_LIST,
} from "../constants/settings";

const initialState = {
  cities: null,
  kitchens: null,
  locations: null,
  clientSources: null,
  paymentTypes: null,
  orderStatuses: null,
  orderTypes: null,
  itemStatuses: null,
  productCategories: null,
  productTypes: null,
  roles: null,
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_SETTINGS_DATA: {
      draft.cities = payload.cities;
      draft.kitchens = payload.kitchens;
      draft.locations = payload.locations;
      draft.clientSources = payload.clientSources;
      draft.paymentTypes = payload.paymentTypes;
      draft.orderStatuses = payload.orderStatuses;
      draft.orderTypes = payload.orderTypes;
      draft.itemStatuses = payload.itemStatuses;
      draft.productCategories = payload.productCategories;
      draft.productTypes = payload.productTypes;
      draft.roles = payload.roles;
      break;
    }

    case UPDATE_SETTINGS_CITIES_LIST: {
      draft.cities = payload;
      break;
    }

    case UPDATE_SETTINGS_KITCHENS_LIST: {
      draft.kitchens = payload;
      break;
    }

    case UPDATE_SETTINGS_LOCATIONS_LIST: {
      draft.locations = payload;
      break;
    }

    case UPDATE_SETTINGS_CLIENT_SOURCES: {
      draft.clientSources = payload;
      break;
    }

    case UPDATE_SETTINGS_PAYMENT_TYPES: {
      draft.paymentTypes = payload;
      break;
    }

    case UPDATE_SETTINGS_ORDER_STATUSES: {
      draft.orderStatuses = payload;
      break;
    }

    case UPDATE_SETTINGS_ORDER_TYPES: {
      draft.orderTypes = payload;
      break;
    }

    case UPDATE_SETTINGS_ITEMS_STATUSES: {
      draft.itemStatuses = payload;
      break;
    }

    case UPDATE_SETTINGS_PRODUCT_CATEGORIES: {
      draft.productCategories = payload;
      break;
    }

    case UPDATE_SETTINGS_PRODUCT_TYPES: {
      draft.productTypes = payload;
      break;
    }

    case UPDATE_SETTINGS_ROLES_LIST: {
      draft.roles = payload;
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
