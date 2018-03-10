import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextCell from './TextCell';

export const renderCellContent = (cell, cellProps) => {
  if (React.isValidElement(cell)) {
    return React.cloneElement(cell, { ...cellProps, ...cell.props });
  }
  if (typeof cell === 'function') {
    return React.createElement(cell, { ...cellProps, ...cell.props });
  }
  return cell;
};

export default class Row extends PureComponent {
  static propTypes = {
    row: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
  }

  renderCell(columnProps) {
    const { row, ...otherRowProps } = this.props;
    const {
      cell = TextCell,
      dataKey,
      getter,
      ...otherColumnProps
    } = columnProps;

    const value = row[dataKey];
    const finalValue = getter ? getter(value) : value;

    const props = { row, ...otherColumnProps, ...otherRowProps };

    if (React.isValidElement(cell)) {
      const Cell = cell;
      return (
        <Cell {...props}>
          {finalValue}
        </Cell>
      );
    }

    if (typeof cell === 'function') {
      return React.createElement(cell, props, finalValue);
    }

    return null;
  }

  render() {
    const { children: columns } = this.props;

    const cells = React.Children.map(
      columns,
      column => column && this.renderCell(column.props),
    );

    return (
      <tr>
        {cells}
      </tr>
    );
  }
}
