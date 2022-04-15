import api from "../../apiSingleton";

import {
  CHECK_SESSION_SUCCESS,
  LOGOUT,
  UPDATE_JWT,
  UPDATE_SESSION_FAILURE,
  UPDATE_SESSION_SUCCESS,
} from "../constants/session";
import * as ROUTES from "../../constants/routes";
import history from "constants/history";
import { getProducts } from "./products";
import { getStatistic } from "./statistic";
import { getSyncData } from "./syncData";
import { getSettings } from "./settings";
import { getUser } from "./user";

const PUBLIC_ROUTES = [ROUTES.LOGIN];

export function login({ phone, password, onSuccess, onError }) {
  return async () => {
    const { access_token } = await api.session.create({ phone, password });
    const isResponseValid = !!access_token;

    if (isResponseValid) {
      localStorage.setItem("jwt", access_token);
      api.apiClient.setToken(access_token);
      onSuccess();
    } else {
      onError();
    }
  };
}

export function logout() {
  return async (dispatch) => {
    api.apiClient.setToken("");

    dispatch({ type: LOGOUT });

    const pathname = history?.location?.pathname;

    if (!PUBLIC_ROUTES || !PUBLIC_ROUTES?.includes(pathname)) {
      if (history) {
        history.replace(ROUTES.LOGIN);
      }
    }
  };
}

export function checkSession() {
  return async (dispatch) => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      api.apiClient.setToken(jwt);

      await dispatch({ type: UPDATE_SESSION_SUCCESS });
      await dispatch(getUser());
      await dispatch(getStatistic());
      // await dispatch(getSyncData());
      await dispatch(getSettings());
      await dispatch(getProducts());

      await dispatch({
        type: UPDATE_JWT,
        payload: { jwt },
      });
    } else {
      dispatch({ type: UPDATE_SESSION_FAILURE });
    }

    dispatch({ type: CHECK_SESSION_SUCCESS });
  };
}
