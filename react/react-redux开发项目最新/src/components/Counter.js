import React,{ Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { increase, decrease, increase_async } from "../actions/actions";
export class Counter extends Component {
	componentDidMount() {
		let { increase_async } = this.props;
		increase_async();
	}
	sssClick(){
		this.props.history.push('/welcome/sss');
	}
	goBack(){
		this.props.history.goBack();
	}
	go(){
		this.props.history.go();
	}
	goforward(){
		this.props.history.goForward();
	}
	render() {
		const {
			value,
			user,
			increase,
			decrease,
			counters,
			increase_async
		} = this.props;
		
		return (
			<div>
				<h1>Counter</h1>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/counter'>counter</Link></li>
					<li><Link to='/welcome'>welcome</Link></li>
				</ul>
				<h2>{value}</h2>
				<button onClick={increase}>{counters.data ? counters.data.job : counters.data}</button>
				<span dangerouslySetInnerHTML={{ __html: "<-->" }}></span>
				<button onClick={decrease}>Decrease</button>
				<span dangerouslySetInnerHTML={{ __html: "<-->" }}></span>
				<button onClick={increase_async}>Increase_Async</button>
				<button onClick={this.sssClick.bind(this)}>sssClick</button>
				<button onClick={this.goBack.bind(this)}>goBack</button>
				<button onClick={this.go.bind(this)}>go</button>
				<button onClick={this.goforward.bind(this)}>goforward</button>

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

function mapStateToProps(state) {
	return {
		counters: state.counter,

		value: state.counter.value,
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ increase, decrease, increase_async }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
