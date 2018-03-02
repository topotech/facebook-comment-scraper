import { connect } from 'react-redux';

import PostsDisplay from '../../components/DownloadPosts/PostsDisplay';

import fetchPosts from '../../actions/posts';

import page from '../../selectors/page';

export default connect(
  (state, ownProps) => ({
    page: page(state, ownProps.pageId),
    request: state.posts && state.posts.get(ownProps.pageId),
  }),
  { fetchData: fetchPosts },
)(PostsDisplay);
