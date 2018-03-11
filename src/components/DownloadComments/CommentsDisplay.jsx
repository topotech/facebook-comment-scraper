import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';
import PrevNext from '../_common/PrevNext';
import RowsPerPage from '../_common/RowsPerPage';

import CommentsTable from '../_tables/CommentsTable';

export default class CommentsDisplay extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    request: PropTypes.instanceOf(Map),
    rows: PropTypes.oneOfType([
      PropTypes.instanceOf(List),
      PropTypes.bool,
    ]),
  }

  onClickFetch = () => {
    const { itemId } = this.props;
    this.props.fetchData({ itemId });
  }

  renderFetchButton() {
    const { itemId } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.onClickFetch}>
          Fetch comments for {itemId}
        </button>
      </React.Fragment>
    );
  }

  renderRetryButton() {
    const { itemId, request } = this.props;

    const error = request.get('error');

    return (
      <React.Fragment>
        <p>Failed to fetch posts for {itemId}.</p>
        <ErrorMessage error={error} />
        <button onClick={this.onClickFetch}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { itemId, rows } = this.props;

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <PrevNext />
          <RowsPerPage />
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={rows}
            filename={`comments_${itemId}`}
          />
        </div>
        <CommentsTable data={rows} />
      </React.Fragment>
    );
  }

  render() {
    const { rows, itemId } = this.props;

    let content;
    if (rows === false) {
      content = this.renderRetryButton();
    } else if (rows === null) {
      content = 'Loading';
    } else if (!rows) {
      if (!itemId) {
        content = 'Type in post ID or comment ID';
      } else {
        content = this.renderFetchButton();
      }
    } else {
      content = this.renderContent();
    }

    return (
      <section>
        <h2>Comments {itemId ? `for ${itemId}` : ''}</h2>
        {content}
      </section>
    );
  }
}
