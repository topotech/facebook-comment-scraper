import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';

import rootReducer from './reducers';

const isNonObject = item => (
  !item ||
  typeof item === 'string' ||
  typeof item === 'boolean' ||
  typeof item === 'number' ||
  Array.isArray(item)
);

const isRequestObject = item => (
  'error' in item &&
  'isFetching' in item &&
  'data' in item
);

const makeSafeMergeObject = mergeObject =>
  Object.keys(mergeObject).reduce((safeObject, currentKey) => {
    const currentValue = mergeObject[currentKey];

    if (
      isNonObject(currentValue) ||
      currentKey === 'records'
    ) {
      return {
        ...safeObject,
        [currentKey]: currentValue,
      };
    }

    if (isRequestObject(currentValue)) {
      if (currentValue.error || currentValue.isFetching) {
        return safeObject;
      }

      return {
        ...safeObject,
        [currentKey]: currentValue,
      };
    }

    return {
      ...safeObject,
      [currentKey]: makeSafeMergeObject(currentValue),
    };
  }, {});

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    const mergedState = {};
    Object.keys(initialState)
      .forEach((key) => {
        const mergeObject = persistedState[key];
        if (!mergeObject) {
          return;
        }
        const safeMergeObject = makeSafeMergeObject(mergeObject);
        mergedState[key] = initialState[key].merge(safeMergeObject);
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
