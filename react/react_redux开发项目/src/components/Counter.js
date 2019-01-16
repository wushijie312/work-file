import React,{ Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
// import UI component
// import UI_Counter from "./Counter";
// import actions
import { increase,decrease,increase_async } from "../actions/actions";
export class Counter extends Component{
	componentDidMount() {
		let { increase_async } = this.props;
		increase_async();
	}
	render(){
		const { 
			value, 
			user,
			increase,
			decrease,
			counters,
			increase_async
		} = this.props;

		return(
			<div>
				<h2>{ value }</h2>
				<button onClick = {increase}>{counters.data?counters.data.job:counters.data}</button>
				<span dangerouslySetInnerHTML = {{__html:"<-->"}}></span>
				<button onClick = {decrease}>Decrease</button>
				<span dangerouslySetInnerHTML = {{__html:"<-->"}}></span>
				<button onClick = {increase_async}>Increase_Async</button>
				
			</div>
		)
	}
}

Counter.propTypes = {
	value: PropTypes.number.isRequired,
	counters: PropTypes.object.isRequired,
	increase: PropTypes.func.isRequired,
	decrease: PropTypes.func.isRequired,
	increase_async: PropTypes.func.isRequired,
}

function mapStateToProps(state){
	return{
		counters:state.counter,

		value:state.counter.value,
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({increase,decrease,increase_async}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter);