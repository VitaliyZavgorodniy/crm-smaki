import produce from "immer";

import { LOGOUT } from "../constants/session";
import { CLOSE_ALL_MODALS, CLOSE_MODAL, OPEN_MODAL } from "../constants/view";

const initialState = {
  modals: [],
};

export default produce((draft, action) => {
  const { type, payload = {} } = action;
  const { name = "", props = {} } = payload;

  switch (type) {
    case OPEN_MODAL:
      draft.modals.unshift({
        createdAt: new Date(),
        props: { ...props },
        name,
      });
      break;
    case CLOSE_MODAL:
      console.log(payload);
      draft.modals = payload.modals;
      break;
    case CLOSE_ALL_MODALS:
      draft.modals = [];
      break;
    case LOGOUT:
      draft.modals = [];
      break;
    default:
      break;
  }
}, initialState);
