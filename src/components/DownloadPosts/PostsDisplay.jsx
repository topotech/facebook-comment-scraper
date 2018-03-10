import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import DateCell from '../_common/DateCell';
import LinkCell from '../_common/LinkCell';
import TextCell from '../_common/TextCell';
import DownloadAs from '../_common/DownloadAs';
import ErrorMessage from '../_common/ErrorMessage';
import RefreshButton from '../_common/RefreshButton';

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
          <RefreshButton onClick={this.onClickFetch} />
          <DownloadAs
            data={rows}
            filename={`posts_${pageId}`}
          />
        </div>
        <Table data={rows}>
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
            dataKey="like_count"
          />
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
