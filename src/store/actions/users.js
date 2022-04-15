/*  camelcase */
import api from "../../apiSingleton";

import {
  CLEAR_EDITED_USER,
  CLEAR_USERS,
  UPDATE_EDITED_USER,
  UPDATE_FULL_USERS,
  UPDATE_USERS,
} from "../constants/users";
import { mapUsers } from "../../utils/mappers/users";

const STATUSES = {
  Активен: "active",
  Неактивен: "disabled",
};

function getRoleName(roles, role) {
  const { name } = roles.find((el) => el.title === role || el.name === role);

  return name;
}

function getKitchenCode(kitchens, kitchen) {
  const { code } = kitchens.find((el) => el.title === kitchen);

  return code;
}

export function getFullUsers() {
  return async (dispatch) => {
    const { data } = await api.users.get({ per_page: 500 });

    await dispatch({
      type: UPDATE_FULL_USERS,
      payload: { fullUsers: data },
    });
  };
}

export function getUsers(page) {
  return async (dispatch, getState) => {
    const data = await api.users.get({ per_page: 500, page });

    const { cities, kitchens } = getState().settings;
    const { list } = mapUsers(data.data, cities, kitchens);

    await dispatch({
      type: UPDATE_USERS,
      payload: { users: { ...data }, list },
    });
  };
}

export function createUser({ user, onSuccess, onError }) {
  return async (dispatch, getState) => {
    const payload = { ...user };
    const { roles, kitchens } = getState().settings;
    const name = getRoleName(roles, user.position);
    const code = getKitchenCode(kitchens, user.kitchen);

    delete payload.position;
    delete payload.kitchen;

    if (!user.iiko_id) {
      delete payload.iiko_id;
    }

    payload.role_name = name;
    payload.kitchen_code = code;

    const res = await api.users.create(payload);

    if (res.errors) {
      onError(res.errors);
    } else {
      onSuccess();
    }

    dispatch(getUsers());
  };
}

export function editUser({ user, onSuccess, onError, id }) {
  return async (dispatch, getState) => {
    try {
      const payload = { ...user };
      const { roles, kitchens } = getState().settings;
      const name = getRoleName(roles, user.position);
      const code = getKitchenCode(kitchens, user.kitchen);

      delete payload.position;
      delete payload.kitchen;

      if (!user.iiko_id) {
        delete payload.iiko_id;
      }

      payload.role_name = name;
      payload.kitchen_code = code;
      payload.status = STATUSES[payload.status] || user.status;

      const res = await api.users.edit(payload, id);

      if (res.errors) {
        onError(res.errors);
      } else {
        onSuccess();
      }

      dispatch(getUsers());
    } catch (error) {
      console.log("Edit user error", error);
    }
  };
}

export function updateEditedUser(user) {
  return {
    type: UPDATE_EDITED_USER,
    payload: { user },
  };
}

export function clearEditedUser() {
  return {
    type: CLEAR_EDITED_USER,
  };
}

export function clearUsers() {
  return { type: CLEAR_USERS };
}
