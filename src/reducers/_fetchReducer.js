import { Map } from 'immutable';

const defaultStatePiece = Map({
  isFetching: false,
  data: null,
  error: null,
});

const defaultState = Map({});

export default ({
  actions,
  key,
}) => {
  if (!actions) {
    throw new Error('No action symbols provided.');
  }

  if (actions.length !== 3) {
    throw new Error('There must be exactly 3 action symbols provided (request, success, failure).');
  }

  return (state = defaultState, action) => {
    if (!actions.includes(action.type)) {
      return state;
    }

    const keyArray = (typeof key === 'function' ? key(state, action) : key);
    const statePiece = state.getIn(keyArray, defaultStatePiece);

    switch (action.type) {
      case actions[0]: // Request
        return state.setIn(keyArray, statePiece.merge({
          isFetching: true,
          data: null,
          error: null,
        }));
      case actions[1]: // Success
        return state.setIn(keyArray, statePiece.merge({
          isFetching: false,
          data: action.data,
          error: null,
        }));
      case actions[2]: // Failure
        return state.setIn(keyArray, statePiece.merge({
          isFetching: false,
          data: false,
          error: action.error,
        }));
      default:
        return null;
    }
  };
};
