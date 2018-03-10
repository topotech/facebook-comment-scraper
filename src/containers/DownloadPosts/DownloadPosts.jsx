import { connect } from 'react-redux';

import DownloadPosts from '../../components/DownloadPosts/DownloadPosts';

export default connect(
  state => ({
    pages: state.pageData.get('records').toArray(),
  }),
)(DownloadPosts);
