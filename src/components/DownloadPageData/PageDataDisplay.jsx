import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Table, { Column } from '../_common/Table';
import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';

export default class PageDataDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    pageUri: PropTypes.string,
    request: PropTypes.instanceOf(Map),
  }

  onClickFetch = () => {
    const { pageUri } = this.props;
    this.props.fetchData({ pageUri });
  }

  renderFetchButton() {
    return (
      <React.Fragment>
        <button onClick={this.onClickFetch}>
          Fetch data for {this.props.pageUri}
        </button>
      </React.Fragment>
    );
  }

  renderRetryButton() {
    const { pageUri, request } = this.props;

    const error = request.get('error');

    return (
      <React.Fragment>
        <p>Failed to fetch data for {pageUri}.</p>
        <ErrorMessage error={error} />
        <button onClick={this.onClickFetch}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { pageUri, request } = this.props;

    const data = request.get('data');

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={data}
            filename={`pagedata_${pageUri}`}
          />
        </div>
        <Table data={data}>
          <Column dataKey="id" />
          <Column dataKey="name" />
        </Table>
      </React.Fragment>
    );
  }

  render() {
    const { request, pageUri } = this.props;

    let content;
    if (!request) {
      if (!pageUri) {
        content = 'Type in page Uri';
      } else {
        content = this.renderFetchButton();
      }
    } else if (request.get('data') === false) {
      content = this.renderRetryButton();
    } else if (request.get('data') === null) {
      content = 'Loading';
    } else {
      content = this.renderContent();
    }

    return (
      <section>
        <h2>Page data{pageUri && ` for ${pageUri}`}</h2>
        {content}
      </section>
    );
  }
}
