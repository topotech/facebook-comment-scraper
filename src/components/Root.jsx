import React from 'react';

import './Root.less';

import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import NetworkListener from '../containers/NetworkListener';

const Root = () => (
  <React.Fragment>
    <NetworkListener />
    <Header />
    <Menu />
    <Main />
  </React.Fragment>
);

export default Root;
