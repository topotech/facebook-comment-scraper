import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';

import rootReducer from './reducers';

const isFetchObject = statePiece => statePiece && (
  Object.keys(statePiece).every(key => typeof statePiece[key] === 'object' && (
    'isFetching' in statePiece[key] ||
    isFetchObject(statePiece[key])
  ))
);

const filterOutUnsafe = statePiece =>
  Object.keys(statePiece).reduce((newObject, currentKey) => {
    const currentPiece = statePiece[currentKey];

    if (
      !currentPiece ||
      typeof currentPiece === 'string' ||
      typeof currentPiece === 'boolean' ||
      typeof currentPiece === 'number' ||
      Array.isArray(currentPiece)
    ) {
      return {
        ...newObject,
        [currentKey]: currentPiece,
      };
    }

    if (
      'error' in currentPiece &&
      'isFetching' in currentPiece &&
      'data' in currentPiece
    ) {
      if (currentPiece.error || currentPiece.isFetching) {
        return newObject;
      }

      return {
        ...newObject,
        [currentKey]: currentPiece,
      };
    }

    return {
      ...newObject,
      [currentKey]: filterOutUnsafe(currentPiece),
    };
  }, {});

const reducer = compose(
  mergePersistedState((initialState, persistedState) => {
    const mergedState = {};
    Object.keys(initialState).forEach((key) => {
      const mergeObject = persistedState[key];
      const safeMergeObject = isFetchObject(mergeObject) ?
        filterOutUnsafe(mergeObject) :
        mergeObject;
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
