import { connect } from 'react-redux';

import DownloadPosts from '../../components/DownloadPosts/DownloadPosts';

import pages from '../../selectors/pages';

export default connect(
  state => ({
    pages: pages(state),
  }),
)(DownloadPosts);
