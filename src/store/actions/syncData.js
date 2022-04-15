import api from "../../apiSingleton";

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

export function getSyncData() {
  return async (dispatch) => {
    const { data: cities } = await api.syncData.getCities();
    const { data: kitchens } = await api.syncData.getKitchens();
    const { data: roles } = await api.syncData.getRoles();
    const { data: productCategories } =
      await api.syncData.getProductCategories();
    const { data: productTypes } = await api.syncData.getProductTypes();
    const { data: paymentTypes } = await api.syncData.getPaymentTypes();
    const { data: statuses } = await api.syncData.getStatuses();
    const { data: timeTypes } = await api.syncData.getTimeTypes();
    const { data: itemsTypes } = await api.syncData.getItemsTypes();

    await dispatch({
      type: UPDATE_CITIES,
      payload: { cities },
    });

    await dispatch({
      type: UPDATE_KITCHENS,
      payload: { kitchens },
    });

    await dispatch({
      type: UPDATE_ROLES,
      payload: { roles },
    });

    await dispatch({
      type: UPDATE_PRODUCT_CATEGORIES,
      payload: { productCategories },
    });

    await dispatch({
      type: UPDATE_PRODUCT_TYPES,
      payload: { productTypes },
    });

    await dispatch({
      type: UPDATE_PAYMENT_TYPES,
      payload: { paymentTypes },
    });

    await dispatch({
      type: UPDATE_STATUSES,
      payload: { statuses },
    });

    await dispatch({
      type: UPDATE_TIME_TYPES,
      payload: { timeTypes },
    });

    await dispatch({
      type: UPDATE_ITEMS_TYPES,
      payload: { itemsTypes },
    });
  };
}
