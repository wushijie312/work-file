import React from 'react';
import { INEREMENT, DEEREMENT } from './redux/action-types'
class App extends React.Component {
  state = {
    count: 1
  }
  increment = () => {
    const number = this.select.value * 1;
   this.props.store.dispatch({type:INEREMENT,data:number});
  }
  decrement = () => {
    const number = this.select.value * 1;
    this.props.store.dispatch({type:DEEREMENT,data:number});
  }
  incrementOdd = () => {
    const number = this.select.value * 1;
    const count = this.props.store.getState() ;
    if(count%2===1){
      this.props.store.dispatch({type:INEREMENT,data:number});
    }
  }
  incrementAsync = () => {
    const number = this.select.value * 1;
    setTimeout(()=>{
      this.props.store.dispatch({type:INEREMENT,data:number});

    },1000);
  }
  render() {
    const count=this.props.store.getState();
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

export default App;
