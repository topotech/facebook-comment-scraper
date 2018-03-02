import { connect } from 'react-redux';

import { setId, setKey } from '../../actions/api';

import Settings from '../../components/Settings/Settings';

export default connect(
  ({ api }) => ({
    apiId: api.get('id'),
    apiKey: api.get('key'),
  }),
  {
    setId,
    setKey,
  },
)(Settings);
