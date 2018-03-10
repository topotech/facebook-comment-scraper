import createFetchAction from './_fetchAction';

import config from '../config';

import { objectToQueryString } from '../utils/url';
import { toFacebookFormat } from '../utils/api';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

const fields = [
  'id',
  'created_time',
  'message',
  'comments.limit(0).summary(true)',
];

const limit = 100;

export default createFetchAction({
  actions: [
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAILURE,
  ],
  url: (state, args) => {
    const {
      postId, ...otherArgs
    } = args;
    return `${config.apiUrl}${postId}/comments/?${objectToQueryString({
      fields,
      limit,
      ...toFacebookFormat(otherArgs),
    })}`;
  },
});
