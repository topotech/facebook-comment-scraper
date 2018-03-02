import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Settings extends Component {
  static propTypes = {
    apiId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    setKey: PropTypes.func.isRequired,
  }

  render() {
    const { apiId, apiKey } = this.props;

    return (
      <section>
        <h2>Settings</h2>

        <fieldset>
          <div>
            <label htmlFor="id">Facebook ID</label>
            <input
              type="text"
              id="id"
              defaultValue={apiId}
              onChange={event => this.props.setId(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="key">API Key</label>
            <input
              type="text"
              id="key"
              defaultValue={apiKey}
              onChange={event => this.props.setKey(event.target.value)}
            />
          </div>
        </fieldset>
      </section>
    );
  }
}
