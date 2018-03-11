import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CommentsDisplay from '../../containers/DownloadComments/CommentsDisplay';

import { pushLastPiece, replaceLastPiece, objectToQueryString, queryStringToObject } from '../../utils/url';

export default class DownloadComments extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        itemId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  onitemIdChange = (event) => {
    const { itemId } = this.props.match.params;

    this.props.history.replace(
      (itemId ?
        replaceLastPiece :
        pushLastPiece)(this.props.location.pathname, event.target.value),
    );
  }

  onCommentsChange = (event) => {
    const oldSearch = queryStringToObject(this.props.location.search);
    const { checked } = event.target;

    this.props.history.replace({
      search: objectToQueryString({
        ...oldSearch,
        comments_only: checked,
      }),
    });
  };

  render() {
    const { itemId } = this.props.match.params;
    const query = queryStringToObject(this.props.location.search);
    const { comments_only: commentsOnly } = query;

    return (
      <React.Fragment>
        <section>
          <h2>Download comments</h2>
          <fieldset>
            <div>
              <label htmlFor="itemId">Post ID or comment ID</label>
              <input
                type="text"
                id="itemId"
                value={itemId || ''}
                onChange={this.onitemIdChange}
                placeholder="eg. 56246989582_10156209097464583"
              />
            </div>
            <div>
              <label htmlFor="withCommentsOnly">With comments only</label>
              <input
                type="checkbox"
                id="withCommentsOnly"
                checked={commentsOnly}
                onChange={this.onCommentsChange}
              />
            </div>
          </fieldset>
        </section>
        <CommentsDisplay itemId={itemId} />
      </React.Fragment>
    );
  }
}
