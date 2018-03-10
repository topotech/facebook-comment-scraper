import React from 'react';
import PropTypes from 'prop-types';

import Mark from './Mark';

const toSafeValue = value => (
  (typeof value !== 'string' && typeof value !== 'number' && !React.isValidElement(value)) ?
    JSON.stringify(value) :
    value
);

const TextCell = ({ children, search }) => {
  const safeValue = toSafeValue(children);
  return (
    <td className="text-cell">
      {
        search ?
          <Mark mark={search}>{safeValue}</Mark> :
          safeValue
      }
    </td>
  );
};

TextCell.propTypes = {
  children: PropTypes.node,
  search: PropTypes.string,
};

export default TextCell;
