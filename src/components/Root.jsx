import React, { Component } from 'react';

import './Root.less';

import Header from './Header';
import Main from './Main';

export default class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}
