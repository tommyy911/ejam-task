import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.module.scss';
import { App } from './components/app';
import * as serviceWorker from './serviceWorker';

import store from './store-config'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
