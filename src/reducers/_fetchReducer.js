import { Map } from 'immutable';
import { actionTypes } from 'redux-localstorage';

const defaultRequestStatePiece = Map({
  isFetching: false,
  data: null,
  error: null,
});

const defaultState = Map({
  requests: Map({}),
  records: Map({}),
});

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
    const updateStatePiece = ({ isFetching, data, error }) => {
      const keyArray = (typeof key === 'function' ? key(state, action) : key);
      const requestsKeyArray = ['requests', ...keyArray];

      const requests = state.getIn(requestsKeyArray, defaultRequestStatePiece);
      let records = state.get('records');

      if (!data) {
        return state
          .setIn(requestsKeyArray, requests.merge({ isFetching, data, error }));
      }

      const rows = [].concat(data);
      const recordIds = [];

      rows.forEach((row) => {
        const record = Record ? new Record(row) : new Map(row);
        records = records.set(record.get('id'), record);
        recordIds.push(record.get('id'));
      });

      return state
        .setIn(requestsKeyArray, requests.merge({ isFetching, data: recordIds, error }))
        .set('records', records);
    };

    const makeRecordsFromRawJs = statePiece =>
      statePiece.set('records', statePiece.get('records', []).map(row => new Record(row)));

    switch (action.type) {
      case actionTypes.INIT: {
        if (!Record) {
          return state;
        }
        return makeRecordsFromRawJs(state);
      }
      case actions[0]: { // Request
        return updateStatePiece({
          isFetching: true,
          data: null,
          error: null,
        });
      }
      case actions[1]: { // Success
        return updateStatePiece({
          isFetching: false,
          data: action.data,
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
