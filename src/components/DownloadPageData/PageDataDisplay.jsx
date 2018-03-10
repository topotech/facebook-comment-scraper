import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Map } from 'immutable';

import Table, { Column } from '../_common/Table';
import TextCell from '../_common/TextCell';
import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';

export default class PageDataDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    pageUri: PropTypes.string,
    request: PropTypes.instanceOf(Map),
    rows: PropTypes.oneOfType([
      PropTypes.instanceOf(List),
      PropTypes.bool,
    ]),
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
    const { pageUri, rows } = this.props;

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={rows}
            filename={`pagedata_${pageUri}`}
          />
        </div>
        <Table data={rows}>
          <Column
            dataKey="id"
            cell={({ row }) => (
              <TextCell>
                <Link to={`https://www.facebook.com/${row.id}`}>
                  {row.id}
                </Link>
              </TextCell>
            )}
          />
          <Column dataKey="name" />
          <Column
            dataKey="posts"
            cell={({ row }) => (
              <TextCell>
                <Link to={`/download-posts/${row.id}`}>
                  Download posts
                </Link>
              </TextCell>
            )}
          />
        </Table>
      </React.Fragment>
    );
  }

  render() {
    const { pageUri, rows } = this.props;

    let content;
    if (rows === false) {
      content = this.renderRetryButton();
    } else if (rows === null) {
      content = 'Loading';
    } else if (!rows) {
      if (!pageUri) {
        content = 'Type in page Uri';
      } else {
        content = this.renderFetchButton();
      }
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
