import { connect } from 'react-redux';

import CommentsDisplay from '../../components/DownloadComments/CommentsDisplay';

import fetchComments from '../../actions/comments';

export default connect(
  (state, ownProps) => ({
    request: state.comments && state.comments.get(ownProps.postId),
  }),
  { fetchData: fetchComments },
)(CommentsDisplay);
