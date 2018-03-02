import React from 'react';
import PropTypes from 'prop-types';

const toSafeValue = value => (
  (typeof value !== 'string' && typeof value !== 'number' && !React.isValidElement(value)) ?
    JSON.stringify(value) :
    value
);

const TextCell = ({ children }) => (
  <td>
    {toSafeValue(children)}
  </td>
);

TextCell.propTypes = {
  children: PropTypes.node,
};

export default TextCell;
