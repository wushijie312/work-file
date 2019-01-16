import React,{ Component } from "react";
// import style from "./style.scss";
import { Link } from "react-router-dom";
export default class Welcome extends Component{
	render(){

		return(
			<div>
				<ul>
			        <li><Link to='/'>Home</Link></li>
			        <li><Link to='/counter'>counter</Link></li>
			        <li><Link to='/welcome/sss'>SSS</Link></li>
			        <li><Link to={{pathname:'/hello/2/linkquery'}}>Linkquery</Link></li>
			        <li><Link to='/welcome'>welcome</Link></li>
			        <li><Link to='/hello/2'>hello</Link></li>
			      </ul>
			    { this.props.match.path}

				<div>welcome</div>
			</div>
		)
	}
}

