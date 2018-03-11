import createFetchReducer from './_fetchReducer';
import Comment from '../records/Comment';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
} from '../actions/comments';
import { objectToQueryString } from '../utils/url';

export default createFetchReducer({
  actions: [
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAILURE,
  ],
  key: (state, action) => {
    const { postId, ...otherOptions } = action.options;
    return [postId, objectToQueryString({ limit: 100, offset: 0, ...otherOptions })];
  },
  Record: Comment,
});
