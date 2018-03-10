import React from 'react';
import PropTypes from 'prop-types';

const { format } = Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

const toDate = (value) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  return format(date);
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
