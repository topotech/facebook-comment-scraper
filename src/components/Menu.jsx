import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.less';

import Icon from './_common/Icon';

export default class Menu extends Component {
  links = [
    {
      to: '/',
      label: 'Home',
      icon: 'home',
    },
    {
      to: '/download-page-data',
      label: 'Download page data',
      icon: 'description',
    },
    {
      to: '/download-posts',
      label: 'Download posts',
      icon: 'dns',
    },
    {
      to: '/download-comments',
      label: 'Download comments',
      icon: 'comment',
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: 'settings',
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
                {link.icon && <Icon>{link.icon}</Icon>}
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
