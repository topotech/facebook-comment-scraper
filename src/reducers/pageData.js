import createFetchReducer from './_fetchReducer';

import {
  PAGE_DATA_REQUEST,
  PAGE_DATA_SUCCESS,
  PAGE_DATA_FAILURE,
} from '../actions/pageData';

export default createFetchReducer({
  actions: [
    PAGE_DATA_REQUEST,
    PAGE_DATA_SUCCESS,
    PAGE_DATA_FAILURE,
  ],
  key: (state, action) => [action.options.pageUri],
});
