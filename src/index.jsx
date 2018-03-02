import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './components/Root';

import store from './store';

render((
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
), document.getElementById('react-container'));
