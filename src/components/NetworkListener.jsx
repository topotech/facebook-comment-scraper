import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NetworkListener extends Component {
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
    online: PropTypes.func.isRequired,
    offline: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  onOnline = () => {
    this.props.online();
  }

  onOffline = () => {
    this.props.offline();
  }

  render() {
    if (this.props.isOnline) {
      return null;
    }

    return (
      <div className="warning-message">
        <p>
          You're offline. You can browse the data you have already fetched,
          but you can't make any new requests.
        </p>
      </div>
    );
  }
}
