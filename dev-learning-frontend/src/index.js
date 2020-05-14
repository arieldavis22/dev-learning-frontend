import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import {Provider} from 'react-redux' 
import {createStore} from 'redux'
import userReducer from './reducers/userReducer'
import App from './App';

const store = createStore(userReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
