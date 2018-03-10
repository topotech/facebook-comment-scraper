import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import { download } from '../../utils/file';
import jsonToCSV from '../../utils/csv';

export default class DownloadAs extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.instanceOf(Map),
    ]).isRequired,
    filename: PropTypes.string,
  }

  static defaultProps = {
    filename: 'facebook-comment-scraper-data',
  }

  onOptionChange = (event) => {
    const { filename } = this.props;
    const { value } = event.target;

    switch (value) {
      case 'JSON': {
        const { dataObject } = this;
        download(`${filename}.json`, JSON.stringify(dataObject));
        break;
      }
      case 'CSV': {
        const { dataObject } = this;
        download(`${filename}.csv`, jsonToCSV(dataObject));
        break;
      }
      default:
    }
  }

  get dataObject() {
    const { data } = this.props;

    if (data instanceof Map || data instanceof List) {
      return data.toJSON();
    }

    return data;
  }

  render() {
    return (
      <fieldset>
        <div>
          <label htmlFor="downloadAs">Download as...</label>
          <select onChange={this.onOptionChange}>
            <option value=""> -- select an option -- </option>
            <option value="JSON">JSON</option>
            <option value="CSV">CSV</option>
          </select>
        </div>
      </fieldset>
    );
  }
}
