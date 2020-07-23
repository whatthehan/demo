import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

import { createStore } from './redux';
import { Provider } from './react-redux';
import { reducer } from './reducer';

const store = createStore(reducer, { count: 1 });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
