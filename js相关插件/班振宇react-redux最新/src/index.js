import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

//状态管理组件
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

//中间件
import thunk from 'redux-thunk' //执行Action创建函数返回的函数
import {createLogger} from 'redux-logger' //日志管理,createLogger为日志中间件的生成器

//样式
import './index.css';

//根组件 import App from './containers/Main/Main.js';
// import App from './containers/App';
//后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务
import registerServiceWorker from './registerServiceWorker';

//页面
import Main from './containers/Main/Main.jsx';
import NotFound from './containers/NotFound/NotFound.jsx';
import Login from './containers/Login/Login.jsx';
import { receiveLoginSuccess } from './actions'
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(reducer, //把reducer传给store,store才会知道如何组织数据更新state
//initial_state, //createStore可以接受应用的初始状态作为参数,那样的话applyMiddleware就是第三个参数
applyMiddleware(...middleware))

//加载登录态
let loginInfo = localStorage.getItem('loginInfo');
if(loginInfo){
  store.dispatch(receiveLoginSuccess(JSON.parse(loginInfo)));
}

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route path='/main' component={Main}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();

export default store;
