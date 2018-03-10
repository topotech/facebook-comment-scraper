import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import DateCell from '../_common/DateCell';
import LinkCell from '../_common/LinkCell';
import TextCell from '../_common/TextCell';
import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';

export default class CommentsDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    postId: PropTypes.string,
    request: PropTypes.instanceOf(Map),
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
    const { postId, request } = this.props;

    const data = request.get('data');

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={data}
            filename={`comments_${postId}`}
          />
        </div>
        <Table data={data}>
          <Column
            dataKey="id"
            cell={({ row }) => (
              <LinkCell href={row.permalink_url}>
                {row.shortId}
              </LinkCell>
            )}
          />
          <Column
            dataKey="created_time"
            cell={({ children }) => (
              <DateCell>
                {children}
              </DateCell>
            )}
          />
          <Column dataKey="message" />
          <Column
            dataKey="comment_count"
            cell={({ children, row }) => (
              <TextCell>
                {children ? (
                  <Link to={`/download-comments/${row.id}`}>
                    {children}
                  </Link>
                ) : ''}
              </TextCell>
            )}
          />
        </Table>
      </React.Fragment>
    );
  }

  render() {
    const { request, postId } = this.props;

    let content;
    if (!request) {
      if (!postId) {
        content = 'Type in post ID or comment ID';
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
        <h2>Comments for {postId}</h2>
        {content}
      </section>
    );
  }
}
