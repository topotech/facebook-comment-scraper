import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.less';

export default class Menu extends Component {
  links = [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/download-page-data',
      label: 'Download page data',
    },
    {
      to: '/download-posts',
      label: 'Download posts',
    },
    {
      to: '/download-comments',
      label: 'Download comments',
    },
    {
      to: '/settings',
      label: 'Settings',
    },
  ];

  render() {
    return (
      <nav>
        <ul>
          {this.links.map(link => (
            <li key={link.to}>
              <NavLink
                exact={link.to === '/'}
                to={link.to}
                activeClassName="active"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
