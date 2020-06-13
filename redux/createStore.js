import {applyMiddleware, createStore as createReduxStore} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import createReducer from './createReducer.js';

const composeEnhancers = composeWithDevTools({});
const customMiddleware = ({dispatch, getState}) => next => action => {
  const state = getState();
  if(action.type === 'LOGOUT') {
    const promises = [state.auth.logout()];
    if(state.firebase) {
      promises.push(state.firebase.logout());
    }

    const logoutCb = () => {
      if(action.relogin) {
        state.auth.login();
      }
      else {
        window.location.replace('/');
      }
    };
    Promise.all(promises).then(logoutCb).catch(logoutCb);
  }

  return next(action);
};


export default function createStore() {
  const reducer = createReducer();
  let store;
  if(typeof window === 'undefined') {
    store = createReduxStore(reducer);
  }
  else if(process.env.NODE_ENV === 'production') {
    store = createReduxStore(reducer, composeEnhancers(applyMiddleware(customMiddleware)));
  }
  else {
    store = createReduxStore(reducer, composeEnhancers(applyMiddleware(createLogger(), customMiddleware)));
  }

  return store;
};
