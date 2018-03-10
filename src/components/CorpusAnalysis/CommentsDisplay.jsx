import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import DownloadAs from '../_common/DownloadAs';
import CommentsTable from '../_tables/CommentsTable';

import { queryStringToObject } from '../../utils/url';

export default class CommentsDisplay extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    postId: PropTypes.string,
    rows: PropTypes.oneOfType([
      PropTypes.instanceOf(List),
      PropTypes.bool,
    ]),
  }

  renderContent() {
    const { rows } = this.props;
    const query = queryStringToObject(this.props.location.search);

    return (
      <React.Fragment>
        <div className="table-toolbar">
          <DownloadAs
            data={rows}
            filename="comments_all"
          />
        </div>
        <CommentsTable
          data={rows}
          search={query.search}
        />
      </React.Fragment>
    );
  }

  render() {
    const { rows, postId } = this.props;

    let content;
    if (!rows || !rows.size) {
      content = 'No data to analyze. Explore some pages and posts first.';
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
