import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchComments, { defaultParams } from '../../actions/comments';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import CommentsDisplay from '../../components/DownloadComments/CommentsDisplay';

import { mergeSearchWithDefaults, queryStringToObject } from '../../utils/url';

const getRequest = makeGetRequest('comments');
const getRows = makeGetRows('comments');

export default withRouter(connect(
  (state, ownProps) => {
    const itemId = ownProps.itemId || ownProps.match.params.itemId;
    const { search } = ownProps.location;
    const { comments_only: commentsOnly } = queryStringToObject(search);
    const query = mergeSearchWithDefaults(search, defaultParams);

    const rows = getRows(state, [itemId, query]);
    const filteredRows = commentsOnly ? rows.filter(row => row.comment_count) : rows;

    return {
      itemId,
      request: getRequest(state, [itemId, query]),
      rows: filteredRows,
      query,
    };
  },
  { fetchData: fetchComments },
)(CommentsDisplay));
