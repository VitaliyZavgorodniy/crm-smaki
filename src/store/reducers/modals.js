import produce from "immer";

import {
  OPEN_EDITORCALLCENTER,
  CLOSE_EDITORCALLCENTER,
  OPEN_MODAL_FILTER,
  CLOSE_MODAL_FILTER
} from "../constants/modals";

const initialState = {
  callCenter: {
    isOpen: false,
    data: null,
  },
  fiilter: {
    isOpen: false
  }
};

export default produce((draft, action) => {
  const { type, payload = null } = action;

  switch (type) {
    case OPEN_EDITORCALLCENTER: {
      draft.callCenter.isOpen = true;
      draft.callCenter.data = payload;
      break;
    }

    case CLOSE_EDITORCALLCENTER: {
      draft.callCenter.isOpen = false;
      draft.callCenter.data = null;
      break;
    }

    case OPEN_MODAL_FILTER: {
      draft.fiilter.isOpen = true;
      break;
    }

    case CLOSE_MODAL_FILTER: {
      draft.fiilter.isOpen = false;
      break;
    }

    default: {
      break;
    }
  }
}, initialState);
