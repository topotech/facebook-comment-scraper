import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import Row from './Row';
import HeaderRow from './HeaderRow';

import './Table.less';

export const Column = () => null;

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Map),
    ]).isRequired,
  }

  renderTableHeader() {
    return (
      <HeaderRow
        {...this.props}
      />
    );
  }

  renderRow = (row, rowIndex) => {
    const rowRecord = row instanceof Map ? row.toJSON() : row;
    return (
      <Row
        key={row.id || rowIndex}
        row={rowRecord}
        {...this.props}
      />
    );
  }

  renderRows() {
    const { data } = this.props;

    return (
      <tbody>
        {
          (
            Array.isArray(data) ||
            data instanceof List
          ) ?
            data.map(this.renderRow) :
            this.renderRow(data, 0)
        }
      </tbody>
    );
  }

  render() {
    return (
      <table>
        {this.renderTableHeader()}
        {this.renderRows()}
      </table>
    );
  }
}
