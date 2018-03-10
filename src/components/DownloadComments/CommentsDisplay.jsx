import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';

import CommentsTable from '../_tables/CommentsTable';

export default class CommentsDisplay extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    postId: PropTypes.string,
    request: PropTypes.instanceOf(Map),
    rows: PropTypes.oneOfType([
      PropTypes.instanceOf(List),
      PropTypes.bool,
    ]),
  }

  onClickFetch = () => {
    const { postId } = this.props;
    this.props.fetchData({ postId });
  }

  renderFetchButton() {
    const { postId } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.onClickFetch}>
          Fetch comments for {postId}
        </button>
      </React.Fragment>
    );
  }

  renderRetryButton() {
    const { postId, request } = this.props;

    const error = request.get('error');

    return (
      <React.Fragment>
        <p>Failed to fetch posts for {postId}.</p>
        <ErrorMessage error={error} />
        <button onClick={this.onClickFetch}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { postId, rows } = this.props;

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={rows}
            filename={`comments_${postId}`}
          />
        </div>
        <CommentsTable data={rows} />
      </React.Fragment>
    );
  }

  render() {
    const { rows, postId } = this.props;

    let content;
    if (rows === false) {
      content = this.renderRetryButton();
    } else if (rows === null) {
      content = 'Loading';
    } else if (!rows) {
      if (!postId) {
        content = 'Type in post ID or comment ID';
      } else {
        content = this.renderFetchButton();
      }
    } else {
      content = this.renderContent();
    }

    return (
      <section>
        <h2>Comments {postId ? `for ${postId}` : ''}</h2>
        {content}
      </section>
    );
  }
}
