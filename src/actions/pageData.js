import createFetchAction from './_fetchAction';

import config from '../config';

export const PAGE_DATA_REQUEST = 'PAGE_DATA_REQUEST';
export const PAGE_DATA_SUCCESS = 'PAGE_DATA_SUCCESS';
export const PAGE_DATA_FAILURE = 'PAGE_DATA_FAILURE';

export default createFetchAction({
  actions: [
    PAGE_DATA_REQUEST,
    PAGE_DATA_SUCCESS,
    PAGE_DATA_FAILURE,
  ],
  url: (state, args) => `${config.apiUrl}${args.pageUri}`,
});
