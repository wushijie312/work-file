import React,{ Component } from "react";
import {Route,Switch} from "react-router-dom";
import Counter from "../components/Counter";
import Welcome from "../components/Welcome";
import Home from "../components/Home";
export default class GetRoute extends Component{
	render(){
		return(
			<div>
				<Switch>
			      <Route exact path='/' component={Home}/>
			      <Route path='/counter' component={Counter}/>
			      <Route path='/welcome' component={Welcome}/>
			    </Switch>
			</div>
		)
	}
}