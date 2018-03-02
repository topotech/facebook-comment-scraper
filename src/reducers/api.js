import { Map } from 'immutable';

import {
  SET_ID,
  SET_KEY,
} from '../actions/api';

const defaultState = Map({
  id: '',
  key: '',
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ID:
      return state.set('id', action.id);
    case SET_KEY:
      return state.set('key', action.key);
    default:
      return state;
  }
};
