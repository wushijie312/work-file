import React,{ Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component{
	render(){

		return(
			<div>
			    Home
			    <ul>
			        <li><Link to='/'>App</Link></li>
			        <li><Link to='/home'>Home</Link></li>
			      </ul>
			    
			</div>
		)
	}
}

