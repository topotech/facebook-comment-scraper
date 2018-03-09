import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import CommentsDisplay from '../../containers/DownloadComments/CommentsDisplay';

import { pushLastPiece, replaceLastPiece } from '../../utils/url';

class DownloadComments extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        postId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  onChange = (event) => {
    const { postId } = this.props.match.params;

    this.props.history.replace(
      (postId ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, event.target.value),
    );
  }

  render() {
    const { postId } = this.props.match.params;

    return (
      <React.Fragment>
        <section>
          <h2>Download comments</h2>
          <fieldset>
            <div>
              <label htmlFor="postId">Post ID or comment ID</label>
              <input type="text" id="pageUri" value={postId || ''} onChange={this.onChange} />
            </div>
          </fieldset>
        </section>
        <CommentsDisplay postId={postId} />
      </React.Fragment>
    );
  }
}

export default withRouter(DownloadComments);
