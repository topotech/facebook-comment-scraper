import React from 'react';

import './Root.less';

import Header from './Header';
import Menu from './Menu';
import Main from './Main';

const Root = () => (
  <React.Fragment>
    <Header />
    <Menu />
    <Main />
  </React.Fragment>
);

export default Root;
