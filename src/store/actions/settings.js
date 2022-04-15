import api from "../../apiSingleton";
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
export function getSettings() {
  return async (dispatch) => {
    const { data: cities } = await api.settings.getCities();
    const { data: kitchens } = await api.settings.getKitchens();
    const { data: locations } = await api.settings.getLocations();
    const { data: clientSources } = await api.settings.getClientSources();
    const { data: paymentTypes } = await api.settings.getPaymentTypes();
    const { data: orderStatuses } = await api.settings.getOrderStatuses();
    const { data: orderTypes } = await api.settings.getOrderTypes();
    const { data: itemStatuses } = await api.settings.getItemsTypes();
    const { data: productCategories } =
      await api.settings.getProductCategories();
    const { data: productTypes } = await api.settings.getProductTypes();
    const { data: roles } = await api.settings.getRoles();
    await dispatch({
      type: UPDATE_SETTINGS_DATA,
      payload: {
        cities,
        kitchens,
        locations,
        clientSources,
        paymentTypes,
        orderStatuses,
        orderTypes,
        itemStatuses,
        productCategories,
        productTypes,
        roles,
      },
    });
  };
}
export function getSettingsCities() {
  return async (dispatch) => {
    const { data: cities } = await api.settings.getCities();
    await dispatch({ type: UPDATE_SETTINGS_CITIES_LIST, payload: cities });
  };
}
export function getSettingsKitchens() {
  return async (dispatch) => {
    const { data: kitchens } = await api.settings.getKitchens();
    await dispatch({ type: UPDATE_SETTINGS_KITCHENS_LIST, payload: kitchens });
  };
}
export function getSettingsLocations() {
  return async (dispatch) => {
    const { data: locations } = await api.settings.getLocations();
    await dispatch({
      type: UPDATE_SETTINGS_LOCATIONS_LIST,
      payload: locations,
    });
  };
}
export function getSettingsClientSources() {
  return async (dispatch) => {
    const { data: clientSources } = await api.settings.getClientSources();
    await dispatch({
      type: UPDATE_SETTINGS_CLIENT_SOURCES,
      payload: clientSources,
    });
  };
}
export function getSettingsPaymentTypes() {
  return async (dispatch) => {
    const { data: paymentTypes } = await api.settings.getPaymentTypes();
    await dispatch({
      type: UPDATE_SETTINGS_PAYMENT_TYPES,
      payload: paymentTypes,
    });
  };
}
export function getSettingsOrderStatuses() {
  return async (dispatch) => {
    const { data: orderStatuses } = await api.settings.getOrderStatuses();
    await dispatch({
      type: UPDATE_SETTINGS_ORDER_STATUSES,
      payload: orderStatuses,
    });
  };
}
export function getSettingsOrderTypes() {
  return async (dispatch) => {
    const { data: orderTypes } = await api.settings.getOrderTypes();
    await dispatch({ type: UPDATE_SETTINGS_ORDER_TYPES, payload: orderTypes });
  };
}
export function getSettingsItemsTypes() {
  return async (dispatch) => {
    const { data: itemStatuses } = await api.settings.getItemsTypes();
    await dispatch({
      type: UPDATE_SETTINGS_ITEMS_STATUSES,
      payload: itemStatuses,
    });
  };
}
export function getSettingsProductCategories() {
  return async (dispatch) => {
    const { data: productCategories } =
      await api.settings.getProductCategories();
    await dispatch({
      type: UPDATE_SETTINGS_PRODUCT_CATEGORIES,
      payload: productCategories,
    });
  };
}
export function getSettingsProductTypes() {
  return async (dispatch) => {
    const { data: productTypes } = await api.settings.getProductTypes();
    await dispatch({
      type: UPDATE_SETTINGS_PRODUCT_TYPES,
      payload: productTypes,
    });
  };
}
export function getSettingsRoles() {
  return async (dispatch) => {
    const { data: roles } = await api.settings.getRoles();
    await dispatch({ type: UPDATE_SETTINGS_ROLES_LIST, payload: roles });
  };
}
