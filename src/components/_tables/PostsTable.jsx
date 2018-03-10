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
      header="ID"
      cell={({ row }) => (
        <LinkCell href={row.permalink_url}>
          {row.shortId}
        </LinkCell>
      )}
    />
    <Column
      dataKey="created_time"
      header="Date"
      cell={({ children }) => (
        <DateCell>
          {children}
        </DateCell>
      )}
    />
    <Column
      dataKey="message"
      header="Message"
    />
    <Column
      dataKey="like_count"
      header="Likes"
    />
    <Column
      dataKey="comment_count"
      header="Comments"
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
