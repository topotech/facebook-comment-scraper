import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchPosts from '../../actions/posts';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import PostsDisplay from '../../components/DownloadPosts/PostsDisplay';

const getRequest = makeGetRequest('posts');
const getRows = makeGetRows('posts');

export default withRouter(connect(
  (state, ownProps) => {
    const pageId = ownProps.pageId || ownProps.match.params.pageId;
    const search = ownProps.location.search ? ownProps.location.search.slice(1) : '';
    return {
      page: state.pageData.getIn(['records', pageId]),
      pageId,
      request: getRequest(state, [pageId, search]),
      rows: getRows(state, [pageId, search]),
    };
  },
  { fetchData: fetchPosts },
)(PostsDisplay));
