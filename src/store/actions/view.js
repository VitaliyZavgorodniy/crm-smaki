import { CLOSE_ALL_MODALS, CLOSE_MODAL, OPEN_MODAL } from "../constants/view";

export function openModal(name, props = {}) {
  return {
    type: OPEN_MODAL,
    payload: {
      name,
      props,
    },
  };
}

export function closeModal(name) {
  return async (dispatch, getState) => {
    const { modals } = getState().view;
    const newModals = modals.filter((el) => el.name !== name);

    dispatch({
      type: CLOSE_MODAL,
      payload: { modals: newModals },
    });
  };
}

export function closeAllModals() {
  return { type: CLOSE_ALL_MODALS };
}
