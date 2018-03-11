import createFetchAction from './_fetchAction';

import config from '../config';

import { objectToQueryString } from '../utils/url';
import { toFacebookFormat } from '../utils/api';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

const fields = [
  'id',
  'created_time',
  'permalink_url',
  'message',
  'likes.limit(0).summary(true)',
  'comments.limit(0).summary(true)',
  /*
  'link',
  'type',
  'name',
  'shares',
  'reactions.limit(0).summary(true)',
  */
];
const limit = 100;
const offset = 0;

export const defaultParams = {
  limit,
  offset,
};

export default createFetchAction({
  actions: [
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAILURE,
  ],
  url: (state, args) => {
    const { pageId, ...otherArgs } = args;
    return `${config.apiUrl}${pageId}/posts/?${objectToQueryString({
      fields,
      ...defaultParams,
      ...toFacebookFormat(otherArgs),
    })}`;
  },
});
