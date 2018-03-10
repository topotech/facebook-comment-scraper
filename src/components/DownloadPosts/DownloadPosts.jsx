import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import DatePicker from 'react-date-picker';
import { Map } from 'immutable';

import PostsDisplay from '../../containers/DownloadPosts/PostsDisplay';

import { pushLastPiece, replaceLastPiece, objectToQueryString, queryStringToObject } from '../../utils/url';

class DownloadPosts extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        pageId: PropTypes.string,
      }).isRequired,
    }).isRequired,
    pages: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
  }

  onPageIdChange = (event) => {
    const { pageId } = this.props.match.params;

    const { value } = event.target;

    if (value === '__OTHER__') {
      this.props.history.push('/download-page-data');
      return;
    }

    this.props.history.replace(
      (pageId ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, value),
    );
  }

  onDateFromChange = (dateFrom) => {
    const oldSearch = queryStringToObject(this.props.location.search);

    this.props.history.replace({
      search: objectToQueryString({
        ...oldSearch,
        dateFrom: dateFrom.getTime(),
      }),
    });
  }

  onDateToChange = (dateTo) => {
    const oldSearch = queryStringToObject(this.props.location.search);

    this.props.history.replace({
      search: objectToQueryString({
        ...oldSearch,
        dateTo: dateTo.getTime(),
      }),
    });
  }

  render() {
    const { pages } = this.props;
    const { pageId } = this.props.match.params;
    const search = queryStringToObject(this.props.location.search);
    const dateFrom = search.dateFrom ? new Date(search.dateFrom) : null;
    const dateTo = search.dateTo ? new Date(search.dateTo) : null;

    return (
      <React.Fragment>
        <section>
          <h2>Download posts</h2>
          <fieldset>
            <div>
              <label htmlFor="pageId">Page</label>
              <select value={pageId} onChange={this.onPageIdChange}>
                <option value=""> -- select an option -- </option>
                {pages.map(page => (
                  <option key={page.get('id')} value={page.get('id')}>
                    {page.get('name')}
                  </option>
                ))}
                <option value="__OTHER__">other...</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateFrom">Date from</label>
              <DatePicker
                name="dateFrom"
                onChange={this.onDateFromChange}
                value={dateFrom}
                maxDate={dateTo}
              />
            </div>
            <div>
              <label htmlFor="dateTo">Date to</label>
              <DatePicker
                name="dateTo"
                onChange={this.onDateToChange}
                value={dateTo}
                minDate={dateFrom}
              />
            </div>
          </fieldset>
        </section>
        <PostsDisplay />
      </React.Fragment>
    );
  }
}

export default withRouter(DownloadPosts);
