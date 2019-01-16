import React,{ Component } from "react";
import ReactDOM from "react-dom";

import { Router,Redirect,Route,Link,browserHistory,IndexRoute } from "react-router";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import store from "./store";
import Es6Promise from "es6-promise";
Es6Promise.polyfill()
import App from "./components/App";
import Counter from "./components/Counter.js";
import Welcome from "./components/Welcome";
import "../static/common.scss";

  ReactDOM.render(
    <AppContainer>
      <Provider store = { store }>
				<Router history={browserHistory}>
					<Route path="/" component = { App }>
						<IndexRoute component = { Welcome } />
						<Route path="Counter" component = { Counter }></Route>
						<Route path="welcome" component = { Welcome }></Route>
					</Route>
				</Router>
			</Provider>
    </AppContainer>,
    document.getElementById('app')
  );