import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchComments from '../../actions/comments';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import CommentsDisplay from '../../components/DownloadComments/CommentsDisplay';

const getRequest = makeGetRequest('comments');
const getRows = makeGetRows('comments');

export default withRouter(connect(
  (state, ownProps) => {
    const postId = ownProps.postId || ownProps.match.params.postId;
    return {
      postId,
      request: getRequest(state, postId),
      rows: getRows(state, postId),
    };
  },
  { fetchData: fetchComments },
)(CommentsDisplay));
