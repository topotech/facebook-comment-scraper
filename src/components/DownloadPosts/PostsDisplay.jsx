import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import DateCell from '../_common/DateCell';
import LinkCell from '../_common/LinkCell';
import TextCell from '../_common/TextCell';
import ErrorMessage from '../_common/ErrorMessage';

import { queryStringToObject } from '../../utils/url';

export default class PostsDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    pageId: PropTypes.string,
    page: PropTypes.instanceOf(Map),
    request: PropTypes.instanceOf(Map),
  }

  onClickFetch = () => {
    const { pageId } = this.props;
    const search = queryStringToObject(this.props.location.search);

    this.props.fetchData({ pageId, ...search });
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
    const { request } = this.props;

    return (
      <React.Fragment>
        <button onClick={this.onClickFetch}>
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
            dataKey="likes"
            getter={value => value && value.summary && value.summary.total_count}
          />
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
    const { request, page } = this.props;

    let content;
    if (!request) {
      if (!page) {
        content = 'Select page';
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
        <h2>Posts {page && ` for ${page.get('name')}`}</h2>
        {content}
      </section>
    );
  }
}
