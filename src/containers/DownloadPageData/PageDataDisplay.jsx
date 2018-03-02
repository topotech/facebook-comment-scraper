import { connect } from 'react-redux';

import PageDataDisplay from '../../components/DownloadPageData/PageDataDisplay';

import fetchPageData from '../../actions/pageData';

export default connect(
  (state, ownProps) => ({
    request: state.pageData.get(ownProps.pageUri),
  }),
  { fetchData: fetchPageData },
)(PageDataDisplay);
