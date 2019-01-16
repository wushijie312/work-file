import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/reducers'
import GetRoute from "./router/routes.js";
import registerServiceWorker from './registerServiceWorker';
import './assets/css/index.css';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(reducer, applyMiddleware(...middleware));
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <GetRoute />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();