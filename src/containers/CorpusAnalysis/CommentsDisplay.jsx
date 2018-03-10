import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchComments from '../../actions/comments';

import { makeGetRows } from '../../selectors/request';

import CommentsDisplay from '../../components/CorpusAnalysis/CommentsDisplay';

const getRows = makeGetRows('comments');

export default withRouter(connect(
  (state, ownProps) => {
    const postId = ownProps.postId || ownProps.match.params.postId;
    const rows = postId ? getRows(state, postId) : state.comments.get('records').toList();

    return {
      postId,
      rows,
    };
  },
  { fetchData: fetchComments },
)(CommentsDisplay));
