import produce from "immer";

import { LOGOUT } from "../constants/session";
import {
  UPDATE_KITCHENS,
  UPDATE_STATISTIC,
  UPDATE_DELIVERIES,
} from "../constants/statistic";

const initialState = {
  statistic: null,
  kitchens: null,
  deliveries: null,
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_STATISTIC: {
      draft.statistic = payload.statistic;
      break;
    }

    case UPDATE_DELIVERIES: {
      draft.deliveries = payload.deliveries;
      break;
    }

    case UPDATE_KITCHENS: {
      draft.kitchens = payload.kitchens;
      break;
    }

    case LOGOUT: {
      draft.statistic = null;
      break;
    }

    default:
      break;
  }
}, initialState);
