import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ children, size }) => (
  <i className={`material-icons md-${size}`}>{children}</i>
);

Icon.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 18,
};

export default Icon;
