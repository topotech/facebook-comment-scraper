import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostsDisplay from '../../components/DownloadPosts/PostsDisplay';

import fetchPosts from '../../actions/posts';

import page from '../../selectors/page';

export default withRouter(connect(
  (state, ownProps) => {
    const pageId = ownProps.pageId || ownProps.match.params.pageId;
    const search = ownProps.location.search ? ownProps.location.search.slice(1) : '';
    return {
      page: page(state, pageId),
      pageId,
      request: state.posts && state.posts.getIn([pageId, search]),
    };
  },
  { fetchData: fetchPosts },
)(PostsDisplay));
