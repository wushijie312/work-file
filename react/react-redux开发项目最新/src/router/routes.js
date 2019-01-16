import React,{ Component } from "react";
import {Route,Switch} from "react-router-dom";
import Counter from "../components/Counter";
import Welcome from "../components/Welcome";
import Home from "../components/Home";
import Hello from "../components/Hello";
import SSS from "../components/SSS";
import Linkquery from "../components/Linkquery";
export default class GetRoute extends Component{
	render(){
		return(
			<div>
				<Switch>
			      <Route exact path='/' component={Home}></Route>
			      <Route path='/counter' component={Counter}></Route>

			      <Route exact path='/welcome' component={Welcome}></Route>
			      <Route exact path='/welcome/sss' component={SSS}></Route>

			      <Route exact path='/hello/:id' component={Hello}></Route>
			      <Route exact path='/hello/:id/linkquery' component={Linkquery}></Route>

			    </Switch>
			</div>
		)
	}
}