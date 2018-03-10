import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import PageDataDisplay from '../../containers/DownloadPageData/PageDataDisplay';

import { pushLastPiece, replaceLastPiece } from '../../utils/url';

class DownloadPageData extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        pageUri: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  onChange = (event) => {
    const { pageUri } = this.props.match.params;

    let { value } = event.target;

    if (
      value.startsWith('http://www.facebook.com/') ||
      value.startsWith('https://www.facebook.com/') ||
      value.startsWith('http://m.facebook.com/') ||
      value.startsWith('https://m.facebook.com/')
    ) {
      value = value.split('/').pop();
    }

    this.props.history.replace(
      (pageUri ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, value),
    );
  }

  render() {
    const { pageUri } = this.props.match.params;

    return (
      <React.Fragment>
        <section>
          <h2>Download page data</h2>
          <fieldset>
            <div>
              <label htmlFor="pageUri">Page Uri</label>
              <input
                type="text"
                id="pageUri"
                value={pageUri || ''}
                onChange={this.onChange}
                placeholder="eg. gazetapl"
              />
            </div>
          </fieldset>
        </section>
        <PageDataDisplay pageUri={pageUri} />
      </React.Fragment>
    );
  }
}

export default withRouter(DownloadPageData);
