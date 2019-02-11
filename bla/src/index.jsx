import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from 'containers/ErrorBoundary';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-table/react-table.css';

import configureWebsocket from 'services/websocket';

import './assets/postfinance.css';

import configureStore from './store';
import Main from './main';

const store = configureStore({
  instances: {
    activeProfiles: {},
    instances: {},
    selectedInstances: [],
    visible: [],
    instanceFilter: '',
    profileFilter: '',
    dependencies: {},
    overrideFilter: false,
    failedFilter: false,
    filter: {
      id: '',
      failed: false,
      overridden: false,
    },
  },

  profiles: {
    all: {},
  },

});

function startUp() {
  configureWebsocket(store);
  return store;
}

render(
  (
    <Provider store={startUp()}>
      <ErrorBoundary context="index.jsx">
        <HashRouter >
          <Main />
        </HashRouter>
      </ErrorBoundary>
    </Provider>
  ), document.getElementById('main'),
);
