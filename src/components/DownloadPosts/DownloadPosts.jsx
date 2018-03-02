import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Map } from 'immutable';

import PostsDisplay from '../../containers/DownloadPosts/PostsDisplay';

import { pushLastPiece, replaceLastPiece } from '../../utils/url';

class DownloadPosts extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        pageId: PropTypes.string,
      }).isRequired,
    }).isRequired,
    pages: PropTypes.arrayOf(PropTypes.instanceOf(Map)).isRequired,
  }

  onChange = (event) => {
    const { pageId } = this.props.match.params;

    this.props.history.replace(
      (pageId ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, event.target.value),
    );
  }

  render() {
    const { pages } = this.props;
    const { pageId } = this.props.match.params;

    return (
      <React.Fragment>
        <section>
          <h2>Download posts</h2>
          <fieldset>
            <div>
              <label htmlFor="pageId">Page</label>
              <select value={pageId} onChange={this.onChange}>
                <option value=""> -- select an option -- </option>
                {pages.map(page => (
                  <option key={page.get('id')} value={page.get('id')}>
                    {page.get('name')}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </section>
        <PostsDisplay pageId={pageId} />
      </React.Fragment>
    );
  }
}

export default withRouter(DownloadPosts);
