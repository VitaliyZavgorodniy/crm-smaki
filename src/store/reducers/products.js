import produce from 'immer';

import {
    GET_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_FETCHING,
    UPDATE_PRODUCTS_SEARCH
} from '../constants/products';
import { LOGOUT } from '../constants/session';

const initialState = {
    list        : [],
    isFetching  : true,
    searchQuery : ''
};

export default produce((draft, action) => {
    const { payload } = action;

    switch (action.type) {
        case GET_PRODUCTS_SUCCESS: {
            draft.list = payload.data;
            break;
        }

        case UPDATE_PRODUCTS_FETCHING: {
            draft.isFetching = payload.isFetching;
            break;
        }

        case UPDATE_PRODUCTS_SEARCH: {
            draft.searchQuery = payload.searchQuery;
            break;
        }

        case LOGOUT: {
            draft.list = [];
            draft.isFetching = true;
            break;
        }

        default:
            break;
    }
}, initialState);
