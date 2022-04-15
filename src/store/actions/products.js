import api from "../../apiSingleton";
import {
  GET_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FETCHING,
  UPDATE_PRODUCTS_SEARCH,
} from "../constants/products";

const DEFAULT_PARAMS = {
  restaurant: "go",
  per_page: 500,
};

export function getProducts(params = DEFAULT_PARAMS) {
  return async (dispatch) => {
    await dispatch(updateProductsFetching(true));

    const { data } = await api.products.getList({
      ...params,
      per_page: "200",
      page: "1",
    });

    await dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: { data },
    });

    await dispatch(updateProductsFetching(false));
  };
}

export function updateProduct(product, image = undefined) {
  return async (dispatch) => {
    await api.products.updateProduct(product, product.id);

    if (image) {
      await updateProductImage({ id: product.id, image });
    }

    await dispatch(getProducts());
  };
}

export function updateProductsSearchQuery(searchQuery) {
  return {
    type: UPDATE_PRODUCTS_SEARCH,
    payload: { searchQuery },
  };
}

async function updateProductImage({ id, image }) {
  api.products.updateProductImage(image, id, "formData");
}

function updateProductsFetching(isFetching) {
  return {
    type: UPDATE_PRODUCTS_FETCHING,
    payload: { isFetching },
  };
}
