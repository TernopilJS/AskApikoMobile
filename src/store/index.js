import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../modules';

let store = null; // eslint-disable-line

if (__DEV__) { // eslint-disable-line
  const devToolsEnhancer = require('remote-redux-devtools'); // eslint-disable-line
  store = createStore(
    combineReducers(reducers),
    {},
    compose(
      applyMiddleware(thunk),
      devToolsEnhancer.default({
        realtime: true,
        hostname: 'localhost',
        port: 8000,
        suppressConnectErrors: false,
      }),
    ),
  );
} else {
  store = createStore(
    combineReducers(reducers),
    {},
    applyMiddleware(thunk),
  );
}

export default store;
