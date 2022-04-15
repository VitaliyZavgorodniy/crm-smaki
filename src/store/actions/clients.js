import api from "../../apiSingleton";
import { GET_CLIENTS_SUCCESS, GET_SOURCES_SUCCESS } from "../constants/clients";

export function getClients(phone = "380") {
  return async (dispatch) => {
    const { data } = await api.clients.getClients({ phone });

    await dispatch({
      type: GET_CLIENTS_SUCCESS,
      payload: { data },
    });
  };
}

export function getSources() {
  return async (dispatch) => {
    const { data } = await api.clients.getSources();

    await dispatch({
      type: GET_SOURCES_SUCCESS,
      payload: { data },
    });
  };
}
