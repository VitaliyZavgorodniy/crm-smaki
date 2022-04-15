import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { NODE_ENV } from '../config';
import reducers from './reducers';

export default function configureStore(initialState) {
    const composeEnhancers = NODE_ENV === 'DEV' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

    return createStore(
        reducers,
        initialState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
    );
}
