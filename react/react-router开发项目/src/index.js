import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import GetRoute from "./router/routes.js";
import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker 用来做资源的缓存，这样你下次访问时，
	//就可以更快的获取资源。而且因为资源被缓存，
	//所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。
	//注意，registerServiceWorker注册的service worker 
	//只在生产环境中生效（process.env.NODE_ENV === 'production'）
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render((
  <Router>
    <GetRoute />
  </Router>
), document.getElementById('root'));

registerServiceWorker();