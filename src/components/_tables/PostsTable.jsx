import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import DateCell from '../_common/DateCell';
import LinkCell from '../_common/LinkCell';
import TextCell from '../_common/TextCell';

const PostsTable = props => (
  <Table {...props}>
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
);

PostsTable.propTypes = {
  rows: PropTypes.oneOfType([
    PropTypes.instanceOf(List),
    PropTypes.bool,
  ]),
};

export default PostsTable;
