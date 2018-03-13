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
    const { itemId, ...otherOptions } = action.options;
    return [itemId, objectToQueryString({ limit: 100, offset: 0, ...otherOptions })];
  },
  Record: Comment,
});
