import createFetchReducer from './_fetchReducer';
import Post from '../records/Post';

import {
  POSTS_REQUEST,
  POSTS_SUCCESS,
  POSTS_FAILURE,
} from '../actions/posts';
import { objectToQueryString } from '../utils/url';

export default createFetchReducer({
  actions: [
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAILURE,
  ],
  key: (state, action) => {
    const { pageId, ...otherOptions } = action.options;
    return [pageId, objectToQueryString(otherOptions)];
  },
  Record: Post,
});
