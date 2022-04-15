import { isArray } from "lodash";

export const citiesMapped = (arr) => {
  return arr.map((item) => {
    return { title: item.name_ua, value: item.sync_id };
  });
};

export const citySearch = (id, cities) => {
  if (isArray(cities)) {
    return cities.find((item) => item.sync_id === id);
  } else {
    return id;
  }
}