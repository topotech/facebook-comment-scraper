import { Map } from 'immutable';
import { actionTypes } from 'redux-localstorage';

const defaultStatePiece = Map({
  isFetching: false,
  data: null,
  error: null,
});

const defaultState = Map({});

export default ({
  actions,
  key,
  Record,
}) => {
  if (!actions) {
    throw new Error('No action symbols provided.');
  }

  if (actions.length !== 3) {
    throw new Error('There must be exactly 3 action symbols provided (request, success, failure).');
  }

  return (state = defaultState, action) => {
    const getKeyArray = () => (typeof key === 'function' ? key(state, action) : key);
    const getStatePiece = () => state.getIn(getKeyArray(), defaultStatePiece);
    const updateStatePiece = data => state.setIn(getKeyArray(), getStatePiece().merge(data));
    const parseDataRecords = statePiece => statePiece.map((statePiece2) => {
      const statePieceData = statePiece2.get('data');
      if (!statePieceData) {
        return parseDataRecords(statePiece2);
      }
      const data = statePieceData.map(row => new Record(row));
      return statePiece2.set('data', data);
    });

    switch (action.type) {
      case actionTypes.INIT: {
        if (!Record) {
          return state;
        }
        return parseDataRecords(state);
      }
      case actions[0]: { // Request
        return updateStatePiece({
          isFetching: true,
          data: null,
          error: null,
        });
      }
      case actions[1]: { // Success
        const data = Record ? action.data.map(row => new Record(row)) : action.data;
        return updateStatePiece({
          isFetching: false,
          data,
          error: null,
        });
      }
      case actions[2]: { // Failure
        return updateStatePiece({
          isFetching: false,
          data: false,
          error: action.error,
        });
      }
      default:
        return state;
    }
  };
};
