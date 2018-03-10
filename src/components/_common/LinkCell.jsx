import React from 'react';
import PropTypes from 'prop-types';

const toSafeValue = value => (
  (typeof value !== 'string' && typeof value !== 'number' && !React.isValidElement(value)) ?
    JSON.stringify(value) :
    value
);

const LinkCell = ({ children, href }) => (
  <td>
    <a href={href} target="_blank">
      {toSafeValue(children)}
    </a>
  </td>
);

LinkCell.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default LinkCell;
