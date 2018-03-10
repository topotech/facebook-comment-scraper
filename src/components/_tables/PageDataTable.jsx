import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import TextCell from '../_common/TextCell';

const PageDataTable = props => (
  <Table {...props}>
    <Column
      dataKey="id"
      header="ID"
      cell={({ row }) => (
        <TextCell>
          <Link to={`https://www.facebook.com/${row.id}`}>
            {row.id}
          </Link>
        </TextCell>
      )}
    />
    <Column
      dataKey="name"
      header="Page name"
    />
    <Column
      dataKey="posts"
      header="Posts"
      cell={({ row }) => (
        <TextCell>
          <Link to={`/download-posts/${row.id}`}>
            Download posts
          </Link>
        </TextCell>
      )}
    />
  </Table>
);

PageDataTable.propTypes = {
  rows: PropTypes.oneOfType([
    PropTypes.instanceOf(List),
    PropTypes.bool,
  ]),
};

export default PageDataTable;
