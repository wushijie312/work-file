import React from 'react';

class App extends React.Component {
  state = {
    count: 1
  }
  increment = () => {
    const number = this.select.value * 1;
    const count = this.state.count + number;
    this.setState({ count });
  }
  decrement = () => {
    const number = this.select.value * 1;
    const count = this.state.count - number;
    this.setState({ count });
  }
  incrementOdd = () => {
    const number = this.select.value * 1;
    const count = this.state.count ;
    if(count%2===1){
      this.setState({count: count+number });
    }
  }
  incrementAsync = () => {
    const number = this.select.value * 1;
    const count = this.state.count ;
    setTimeout(()=>{
      this.setState({ count :count+number});

    },1000);
  }
  render() {
    return (<div>
      <p>click {this.state.count} times</p>
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
