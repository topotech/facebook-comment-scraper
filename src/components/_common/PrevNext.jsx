import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import './PrevNext.less';

import Icon from './Icon';

import { objectToQueryString, queryStringToObject } from '../../utils/url';

const PrevNext = ({ history, location }) => {
  const query = queryStringToObject(location.search);
  const { offset = 0, limit = 100 } = query;

  if (typeof query.offset === 'undefined') {
    history.replace({
      search: objectToQueryString({
        ...query,
        offset: 0,
      }),
    });
  }

  const onClickLeft = () => {
    history.replace({
      search: objectToQueryString({
        ...query,
        offset: offset - limit,
      }),
    });
  };

  const onClickRight = () => {
    history.replace({
      search: objectToQueryString({
        ...query,
        offset: offset + limit,
      }),
    });
  };

  return (
    <div className="prevNext">
      <button
        disabled={offset === 0}
        onClick={onClickLeft}
      >
        <Icon>ic_arrow_back</Icon>
      </button>
      <button onClick={onClickRight}>
        <Icon>ic_arrow_forward</Icon>
      </button>
    </div>
  );
};

PrevNext.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(PrevNext);
