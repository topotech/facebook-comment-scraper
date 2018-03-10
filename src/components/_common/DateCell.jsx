import React from 'react';
import PropTypes from 'prop-types';

const toDate = (value) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  return Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

const DateCell = ({ children }) => (
  <td>
    {toDate(children)}
  </td>
);

DateCell.propTypes = {
  children: PropTypes.node,
};

export default DateCell;
