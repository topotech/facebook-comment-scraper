import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import TextCell from '../_common/TextCell';
import LinkCell from '../_common/LinkCell';

export default class CommentsDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    postId: PropTypes.string,
    request: PropTypes.instanceOf(Map),
  }

  renderFetchButton() {
    const { postId } = this.props;

    return (
      <React.Fragment>
        <button onClick={() => this.props.fetchData({ postId })}>
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
        {error && (
          <p>
            System error message:
            <code>{error.message || 'Unknown error'}</code>
          </p>
        )}
        <button onClick={() => this.props.fetchData({ postId })}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { postId, request } = this.props;

    return (
      <React.Fragment>
        <button onClick={() => this.props.fetchData({ postId })}>
          Refresh data
        </button>
        <Table
          data={request.get('data')}
        >
          <Column
            dataKey="id"
            cell={({ row }) => (
              <LinkCell href={row.permalink_url}>
                {row.id.split('_')[1]}
              </LinkCell>
            )}
          />
          <Column dataKey="message" />
          <Column
            dataKey="comments"
            getter={value => value && value.summary && value.summary.total_count}
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
      content = this.renderFetchButton();
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
