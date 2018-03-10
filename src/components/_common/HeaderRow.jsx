import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class HeaderRow extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  renderCell(columnProps) {
    return (
      <th>
        {columnProps.header || columnProps.dataKey}
      </th>
    );
  }

  render() {
    const { children: columns } = this.props;

    const cells = React.Children.map(
      columns,
      column => column && this.renderCell(column.props),
    );

    return (
      <thead>
        <tr>
          {cells}
        </tr>
      </thead>
    );
  }
}
