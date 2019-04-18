// import React from 'react';


// export default class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 app
//                 <a>去detail</a>
//             </div>
//         )
//     }
// }
import React,{ Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { increase,decrease,increase_async } from "../actions/actions";
export class App extends Component{
    increaseClick(){
        this.props.increase();
    }
    decreaseClick(){
        this.props.decrease();
    }
    increase_asyncClick(){
        this.props.increase_async();
    }
	render(){
        const {
			counter,
        } = this.props;
        const listItems = counter.list?counter.list.map((numbers) =>
  <li>{numbers.name}</li>
):'';
		return(
			<div>
			    App----{counter.value}
			    <ul>
			        <li><Link to='/'>App</Link></li>
			        <li><Link to='/home'>Home</Link></li>
			      </ul>
                 <ul>{listItems}</ul>
                
                  <button onClick={this.increaseClick.bind(this)}>click me add</button>  
                  <button onClick={this.decreaseClick.bind(this)}>click me ---</button>  
                  <button onClick={this.increase_asyncClick.bind(this)}>获取sku列表</button>  
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		counter: state.counter,
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ increase,decrease,increase_async }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);