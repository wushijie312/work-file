import React from 'react';
// import * as actions from './redux/actions'
import {increment,decrement,incrementAsync} from './redux/actions'

import {connect} from 'react-redux'
class App extends React.Component {
  increment = () => {
    const number = this.select.value * 1;
   this.props.increment(number);
  }
  decrement = () => {
    const number = this.select.value * 1;
    this.props.decrement(number);
  }
  incrementOdd = () => {
    const number = this.select.value * 1;
    const count = this.props.count ;
    if(count%2===1){
      this.props.increment(number);
    }
  }
  incrementAsync = () => {
    const number = this.select.value * 1;
      this.props.incrementAsync(number);

  }
  render() {
    const {count}=this.props;
    return (<div>
      <p>click {count} times</p>
      <select ref={select => this.select = select}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.incrementOdd}>increment if odd</button>
      <button onClick={this.incrementAsync}> increment async</button>

    </div>)
  }
}

export default connect(state=>({count:state}),{increment,decrement,incrementAsync})(App);
