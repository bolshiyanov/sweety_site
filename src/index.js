import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { CookiesProvider } from 'react-cookie';

import history from 'utils/history';
import store from 'store';
import GoogleAnalytics from 'utils/googleAnalytics';

import App from 'components/App';

import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.render(
  (
    <CookiesProvider>
      <Router history={history}>
        { GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker /> }
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </CookiesProvider>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
