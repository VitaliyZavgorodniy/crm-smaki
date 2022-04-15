/*  camelcase */
import produce from "immer";

import { LOGOUT } from "../constants/session";
import {
  CLEAR_EDITED_USER,
  CLEAR_USERS,
  UPDATE_EDITED_USER,
  UPDATE_FULL_USERS,
  UPDATE_USERS,
} from "../constants/users";

const initialState = {
  users: null,
  list: null,
  fullUsers: null,
  editedUser: {
    first_name: "",
    last_name: "",
    phone: "",
    position: "",
    kitchen: "",
    city: "",
    status: "",
  },
};

export default produce((draft, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_USERS: {
      draft.users = payload.users;
      draft.list = payload.list;
      break;
    }

    case UPDATE_FULL_USERS: {
      draft.fullUsers = payload.fullUsers;
      break;
    }

    case UPDATE_EDITED_USER: {
      draft.editedUser = payload.user;
      break;
    }

    case CLEAR_EDITED_USER: {
      draft.editedUser = initialState.editedUser;
      break;
    }

    case LOGOUT:
    case CLEAR_USERS: {
      draft.users = null;
      break;
    }

    default:
      break;
  }
}, initialState);
