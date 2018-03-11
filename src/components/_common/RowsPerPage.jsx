import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import './RowsPerPage.less';

import { objectToQueryString, queryStringToObject } from '../../utils/url';

const RowsPerPage = ({ history, location }) => {
  const query = queryStringToObject(location.search);
  const { limit = 100 } = query;

  if (typeof query.limit === 'undefined') {
    history.replace({
      search: objectToQueryString({
        ...query,
        limit: 100,
      }),
    });
  }

  const onChange = (event) => {
    const { value: newLimit } = event.target;

    history.replace({
      search: objectToQueryString({
        ...query,
        limit: newLimit,
      }),
    });
  };

  return (
    <fieldset className="rowsPerPage">
      <div>
        <label htmlFor="rowsPerPage">Rows per page</label>
        <select
          id="rowsPerPage"
          onChange={onChange}
          value={limit}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </fieldset>
  );
};

RowsPerPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(RowsPerPage);
