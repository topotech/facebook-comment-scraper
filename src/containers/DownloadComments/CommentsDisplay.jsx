import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchComments, { defaultParams } from '../../actions/comments';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import CommentsDisplay from '../../components/DownloadComments/CommentsDisplay';

import { mergeSearchWithDefaults } from '../../utils/url';

const getRequest = makeGetRequest('comments');
const getRows = makeGetRows('comments');

export default withRouter(connect(
  (state, ownProps) => {
    const postId = ownProps.postId || ownProps.match.params.postId;
    const query = mergeSearchWithDefaults(ownProps.location.search, defaultParams);
    return {
      postId,
      request: getRequest(state, [postId, query]),
      rows: getRows(state, [postId, query]),
    };
  },
  { fetchData: fetchComments },
)(CommentsDisplay));
