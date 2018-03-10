import createFetchReducer from './_fetchReducer';
import Comment from '../records/Comment';

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
} from '../actions/comments';

export default createFetchReducer({
  actions: [
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAILURE,
  ],
  key: (state, action) => [action.options.postId],
  Record: Comment,
});
