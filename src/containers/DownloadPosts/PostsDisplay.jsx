import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchPosts, { defaultParams } from '../../actions/posts';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import PostsDisplay from '../../components/DownloadPosts/PostsDisplay';

import { mergeSearchWithDefaults } from '../../utils/url';

const getRequest = makeGetRequest('posts');
const getRows = makeGetRows('posts');

export default withRouter(connect(
  (state, ownProps) => {
    const pageId = ownProps.pageId || ownProps.match.params.pageId;
    const query = mergeSearchWithDefaults(ownProps.location.search, defaultParams);
    return {
      page: state.pageData.getIn(['records', pageId]),
      pageId,
      request: getRequest(state, [pageId, query]),
      rows: getRows(state, [pageId, query]),
      query,
    };
  },
  { fetchData: fetchPosts },
)(PostsDisplay));
