import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';
import PrevNext from '../_common/PrevNext';
import RowsPerPage from '../_common/RowsPerPage';

import PostsTable from '../_tables/PostsTable';

import { queryStringToObject } from '../../utils/url';

export default class PostsDisplay extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    pageId: PropTypes.string,
    page: PropTypes.instanceOf(Map),
    request: PropTypes.instanceOf(Map),
    rows: PropTypes.oneOfType([
      PropTypes.instanceOf(List),
      PropTypes.bool,
    ]),
  }

  onClickFetch = () => {
    const { pageId } = this.props;
    const query = queryStringToObject(this.props.location.search);

    this.props.fetchData({ pageId, ...query });
  }

  renderFetchButton() {
    const { page } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.onClickFetch}>
          Fetch posts for {page.get('name')}
        </button>
      </React.Fragment>
    );
  }

  renderRetryButton() {
    const { page, request } = this.props;

    const error = request.get('error');

    return (
      <React.Fragment>
        <p>Failed to fetch posts for {page.get('name')}.</p>
        <ErrorMessage error={error} />
        <button onClick={this.onClickFetch}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { pageId, rows } = this.props;

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <PrevNext />
          <RowsPerPage />
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={rows}
            filename={`posts_${pageId}`}
          />
        </div>
        <PostsTable data={rows} />
      </React.Fragment>
    );
  }

  render() {
    const { page, pageId, rows } = this.props;

    let content;
    if (rows === false) {
      content = this.renderRetryButton();
    } else if (rows === null) {
      content = 'Loading';
    } else if (!rows) {
      if (!pageId) {
        content = 'Select page';
      } else {
        content = this.renderFetchButton();
      }
    } else {
      content = this.renderContent();
    }

    return (
      <section>
        <h2>Posts {page && ` for ${page.get('name')}`}</h2>
        {content}
      </section>
    );
  }
}
