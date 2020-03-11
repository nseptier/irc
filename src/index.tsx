import './index.css';
import * as serviceWorker from './serviceWorker';
import App from 'components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'stores/configure-store';
import { Provider } from 'react-redux';

const store = configureStore();
const renderApp = () => ReactDOM.render(
  (
  <Provider store={store}>
    <App />
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
