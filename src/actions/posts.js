import createFetchAction from './_fetchAction';

import config from '../config';

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POSTS_FAILURE';

const fields = [
  'id',
  'permalink_url',
  'message',
  'comments.limit(0).summary(true)',
  /*
  'link',
  'created_time',
  'type',
  'name',
  'shares',
  'likes.limit(0).summary(true)',
  'reactions.limit(0).summary(true)',
  */
];

export default createFetchAction({
  actions: [
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAILURE,
  ],
  url: (state, args) => `${config.apiUrl}${args.pageId}/posts/?fields=${fields.join(',')}&limit=100`,
});
