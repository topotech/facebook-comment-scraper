import createFetchAction from './_fetchAction';

import config from '../config';

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE';

const fields = [
  'id',
  'message',
  'comments.limit(0).summary(true)',
];

export default createFetchAction({
  actions: [
    COMMENTS_REQUEST,
    COMMENTS_SUCCESS,
    COMMENTS_FAILURE,
  ],
  url: (state, args) => `${config.apiUrl}${args.postId}/comments/?fields=${fields.join(',')}`,
});
