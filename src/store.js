import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';

import rootReducer from './reducers';

const isFetchObject = statePiece => statePiece && Object.keys(statePiece).every(key => typeof statePiece[key] === 'object' && 'isFetching' in statePiece[key]);

const filterOutUnsafe = statePiece =>
  Object.keys(statePiece).reduce((newObject, currentKey) => {
    const currentPiece = statePiece[currentKey];

    if (!currentPiece || !typeof currentPiece !== 'object') {
      return {
        ...newObject,
        [currentKey]: currentPiece,
      };
    }

    if (currentPiece.error || currentPiece.isLoading) {
      return newObject;
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
