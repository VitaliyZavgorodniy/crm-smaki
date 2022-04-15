import { isArray } from "lodash";

export const kitchensMapped = (arr) => {
  return arr.map((item) => {
    return { title: item.title, value: item.code };
  });
};

export const kitchenSearch = (id, kitchens) => {
  if (isArray(kitchens)) {
    return kitchens.find((item) => item.code === id);
  } else {
    return id;
  }
}