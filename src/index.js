import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { CookiesProvider } from 'react-cookie';
import '@pwabuilder/pwaupdate'


import history from 'utils/history';
import store from 'store';

import App from 'components/App';

import './index.scss';

const el = document.createElement('pwa-update');
document.body.appendChild(el);

ReactDOM.render(
  (
    <CookiesProvider>
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </CookiesProvider>
  ),
  document.getElementById('root')
);

