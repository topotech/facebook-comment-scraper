import React, { Component } from 'react';

import './Header.less';

import Menu from './Menu';

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>Facebook comment scraper</h1>
        <Menu />
      </header>
    );
  }
}
