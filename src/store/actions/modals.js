import {
  OPEN_EDITORCALLCENTER,
  CLOSE_EDITORCALLCENTER,
  OPEN_MODAL_FILTER,
  CLOSE_MODAL_FILTER
} from "../constants/modals";

export function openEditorCallcenter(data) {
  return {
    type: OPEN_EDITORCALLCENTER,
    payload: data,
  };
}

export function closeEditorCallcenter() {
  return {
    type: CLOSE_EDITORCALLCENTER,
  };
  //   dispatch({
  //     type: CLOSE_EDITORCALLCENTER,
  //     payload: false,
  //   });
}

export function openModalFilter() {
  return {
    type: OPEN_MODAL_FILTER,
  }
}

export function closeModalFilter() {
  return {
    type: CLOSE_MODAL_FILTER,
  }
}
