
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

//状态管理组件
// import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
// import reducer from './reducers/reducer'

//中间件
// import thunk from 'redux-thunk' //执行Action创建函数返回的函数
// import {createLogger} from 'redux-logger' //日志管理,createLogger为日志中间件的生成器
import App from './components/App';
import Home from './components/Home';
// import {serviceWorker} from './serviceWorker';
import configureStore from './configureStore'
const store = configureStore();

ReactDOM.render( <Provider store={store}>
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route  path="/home" component={Home}></Route>
    </Switch>
  </Router>
</Provider>,
  document.getElementById('root')
)
// serviceWorker();