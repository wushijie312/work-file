import React,{ Component } from "react";
import { Link } from "react-router-dom";
export default class SSS extends Component{
	render(){

		return(
			<div>
			    sssssssssssssssssssssssssssssss
			    <ul>
			        <li><Link to='/'>Home</Link></li>
			        <li><Link to='/counter'>counter</Link></li>
			        <li><Link to='/welcome'>welcome</Link></li>
			      </ul>
			</div>
		)
	}
}

