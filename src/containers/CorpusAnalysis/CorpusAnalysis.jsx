import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CorpusAnalysis from '../../components/CorpusAnalysis/CorpusAnalysis';

export default withRouter(connect(
  null,
)(CorpusAnalysis));
