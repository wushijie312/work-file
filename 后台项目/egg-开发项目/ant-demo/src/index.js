
import React from 'react';
import ReactDOM from 'react-dom';

//状态管理组件
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

//中间件
import thunk from 'redux-thunk' //执行Action创建函数返回的函数
import { createLogger } from 'redux-logger' //日志管理,createLogger为日志中间件的生成器

//样式
import './index.css';

//根组件
import App from './containers/App';

//后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

//
const store = createStore(
    reducer, //把reducer传给store,store才会知道如何组织数据更新state
    //initial_state, //createStore可以接受应用的初始状态作为参数,那样的话applyMiddleware就是第三个参数
    applyMiddleware(...middleware)
)

ReactDOM.render(  
  <Provider store={store}>
    <App />
  </Provider>,document.getElementById('root'));
registerServiceWorker();
