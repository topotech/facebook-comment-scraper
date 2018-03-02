import createFetchReducer from './_fetchReducer';

import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE,
} from '../actions/posts';

export default createFetchReducer({
  actions: [
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAILURE,
  ],
  key: (state, action) => [action.options.pageId],
});
