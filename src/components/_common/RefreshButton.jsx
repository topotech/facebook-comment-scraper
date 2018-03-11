import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from './Icon';

const RefreshButton = ({ onClick }) => (
  <button onClick={onClick}>
    <Icon>refresh</Icon>
    Refresh
  </button>
);

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default connect()(RefreshButton);
