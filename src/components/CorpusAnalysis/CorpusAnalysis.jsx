import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CommentsDisplay from '../../containers/CorpusAnalysis/CommentsDisplay';

import { objectToQueryString, queryStringToObject } from '../../utils/url';

export default class CorpusAnalysis extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }

  onSearchChange = (event) => {
    const oldSearch = queryStringToObject(this.props.location.search);
    const { value: search } = event.target;

    this.props.history.replace({
      search: objectToQueryString({
        ...oldSearch,
        search: search || '',
      }),
    });
  }

  render() {
    const query = queryStringToObject(this.props.location.search);

    return (
      <React.Fragment>
        <section>
          <h2>Corpus analysis</h2>
          <fieldset>
            <div>
              <label htmlFor="search">Search for words</label>
              <input
                type="text"
                id="search"
                value={query.search || ''}
                onChange={this.onSearchChange}
                placeholder="eg. word, another"
              />
            </div>
          </fieldset>
        </section>
        <CommentsDisplay />
      </React.Fragment>
    );
  }
}
