import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
// import filter from 'redux-localstorage-filter';

import rootReducer from './reducers';

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    const mergedState = {};
    Object.keys(initialState).forEach((key) => {
      mergedState[key] = initialState[key].merge(persistedState[key]);
    });
    return mergedState;
  }),
)(rootReducer);

const storage = compose(
  // filter('nested.key');
)(adapter(window.localStorage));

const enhancer = compose(
  applyMiddleware(thunk),
  persistState(storage, 'facebook-comment-scraper'),
);

export default createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer,
);
