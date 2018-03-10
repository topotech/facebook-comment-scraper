import { connect } from 'react-redux';

import fetchPageData from '../../actions/pageData';

import { makeGetRequest, makeGetRows } from '../../selectors/request';

import PageDataDisplay from '../../components/DownloadPageData/PageDataDisplay';

const getRequest = makeGetRequest('pageData');
const getRows = makeGetRows('pageData');

export default connect(
  (state, ownProps) => ({
    request: getRequest(state, ownProps.pageUri),
    rows: getRows(state, ownProps.pageUri),
  }),
  { fetchData: fetchPageData },
)(PageDataDisplay);
