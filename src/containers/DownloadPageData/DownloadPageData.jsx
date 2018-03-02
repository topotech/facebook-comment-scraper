import { connect } from 'react-redux';

import DownloadPageData from '../../components/DownloadPageData/DownloadPageData';

import fetchPageData from '../../actions/pageData';

export default connect(
  () => ({}),
  { fetchData: fetchPageData },
)(DownloadPageData);
