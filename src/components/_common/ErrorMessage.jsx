import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (error ? (
  <p>
    System error message:
    <code>{error.message || 'Unknown error'}</code>
  </p>
) : null);

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
