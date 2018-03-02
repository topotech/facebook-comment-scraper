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

    this.props.history.replace(
      (pageUri ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, event.target.value),
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
              <input type="text" id="pageUri" value={pageUri || ''} onChange={this.onChange} />
            </div>
          </fieldset>
        </section>
        <PageDataDisplay pageUri={pageUri} />
      </React.Fragment>
    );
  }
}

export default withRouter(DownloadPageData);
