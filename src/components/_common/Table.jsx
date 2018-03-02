import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import Row from './Row';
import HeaderRow from './HeaderRow';

export const Column = () => null;

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Map),
    ]).isRequired,
  }

  get dataObject() {
    const { data } = this.props;

    if (data instanceof Map || data instanceof List) {
      return data.toJSON();
    }

    return data;
  }

  renderTableHeader() {
    return (
      <HeaderRow
        {...this.props}
      />
    );
  }

  renderRow = (row, rowIndex) => (
    <Row
      key={row.id || rowIndex}
      row={row}
      {...this.props}
    />
  );

  renderRows() {
    const { dataObject } = this;

    return (
      <tbody>
        {
          Array.isArray(dataObject) ?
            dataObject.map(this.renderRow) :
            this.renderRow(dataObject)
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
