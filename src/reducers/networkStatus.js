import { Map } from 'immutable';

import {
  NETWORK_ONLINE,
  NETWORK_OFFLINE,
} from '../actions/networkStatus';

const defaultState = Map({
  online: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case NETWORK_ONLINE: {
      return state.set('online', true);
    }
    case NETWORK_OFFLINE: {
      return state.set('online', false);
    }
    default:
      return state;
  }
};
