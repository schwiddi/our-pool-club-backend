/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducer';

let enhancer = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);


if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      createLogger(),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, enhancer);
}
