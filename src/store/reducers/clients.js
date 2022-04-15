import produce from 'immer';

import { GET_CLIENTS_SUCCESS, GET_SOURCES_SUCCESS } from '../constants/clients';
import { LOGOUT } from '../constants/session';

const initialState = {
    list    : [],
    sources : []
};

export default produce((draft, action) => {
    const { payload } = action;

    switch (action.type) {
        case GET_CLIENTS_SUCCESS: {
            draft.list = payload.data;
            break;
        }

        case GET_SOURCES_SUCCESS: {
            draft.sources = payload.data;
            break;
        }

        case LOGOUT: {
            draft.list = [];
            break;
        }

        default:
            break;
    }
}, initialState);
