import { connect } from 'react-redux';

import { online, offline } from '../actions/networkStatus';

import NetworkListener from '../components/NetworkListener';

export default connect(
  state => ({
    isOnline: state.networkStatus.get('online'),
  }),
  {
    online,
    offline,
  },
)(NetworkListener);
