import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchComments from '../../actions/comments';

import CommentsDisplay from '../../components/CorpusAnalysis/CommentsDisplay';

import { stringToArray } from '../../utils/string';
import { queryStringToObject } from '../../utils/url';

export default withRouter(connect(
  (state, ownProps) => {
    const query = queryStringToObject(ownProps.location.search);
    const rows = state.comments.get('records').toList();

    const mark = stringToArray(query.search);
    const filteredRows = mark.length ? rows.filter(row =>
      mark.some(markWord => row.message.includes(markWord)),
    ) : rows;

    return {
      rows: filteredRows,
      mark,
    };
  },
  { fetchData: fetchComments },
)(CommentsDisplay));
