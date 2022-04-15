import moment from "moment";

import api from "../../apiSingleton";
import {
  UPDATE_KITCHENS,
  UPDATE_STATISTIC,
  UPDATE_DELIVERIES,
} from "../constants/statistic";

const DEFAULT_PARAMS = {
  date_from: moment().format("Y-MM-DD"),
  date_to: moment().format("Y-MM-DD"),
};

export function getStatistic(params = null) {
  return async (dispatch) => {
    const { data: kitchens } = await api.settings.getKitchens();
    const finalParams = params
      ? params
      : { ...DEFAULT_PARAMS, kitchen_code: kitchens[0].code };

    const { data: statistic } = await api.statistic.getDistances(finalParams);
    // console.log(statistic);

    if (!params) {
      dispatch(updateKitchens(kitchens));
    }

    await dispatch({
      type: UPDATE_STATISTIC,
      payload: { statistic },
    });
  };
}

function updateKitchens(kitchens) {
  return {
    type: UPDATE_KITCHENS,
    payload: { kitchens },
  };
}

export function getDeliveries(params = null) {
  return async (dispatch) => {
    const { data: deliveries } = await api.statistic.getDeliveries(params);

    await dispatch({
      type: UPDATE_DELIVERIES,
      payload: { deliveries },
    });
  };
}
