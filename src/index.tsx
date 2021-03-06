import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import App from 'components/app';
import Auth from 'components/auth';
import store from 'stores';

const renderApp = () => ReactDOM.render(
  (
  <Provider store={store}>
    <Auth>
      <App />
    </Auth>
  </Provider>
  ),
  document.getElementById('root'),
);

renderApp();
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('components/app', renderApp);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
