import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link,Switch,withRouter,Redirect } from 'react-router-dom'

//页面
import Main from './Main/Main';
import Home from './Home/Home';
import File from './File/File';
import User from './User/User';
import Register from './Register/Register';
import Application from './Application/Application';
import NotFound from './NotFound/NotFound';
import TaskList from './TaskList/TaskList';
import Login from './Login/Login';


class App extends Component {

    constructor(props){
      super(props);
    }
  
    componentDidMount() {
    }
    
    render() {
      return (
        <div className="App">
          <Switch>
              <Route path="/" component={Login}></Route>
              <Route path='/main' component={Main} />
          </Switch>
        </div>
      );
    }
  }
  

  function mapStateToProps(state) {
    return {
      currenQueueType: state.selectTasksMenu,
      currenQueueList: state.taskListByType,
      userList:state.getUserList,
      userState:state.userState
    };
  }
  
  export default connect(mapStateToProps)(App);