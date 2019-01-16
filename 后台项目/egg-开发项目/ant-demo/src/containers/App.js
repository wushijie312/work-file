import React, { Component } from 'react';
import './App.css';

//antd组件
import { Layout,Menu, Breadcrumb,Icon } from 'antd';
//路由组件
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom'
//状态机
import { connect } from 'react-redux';

//页面
import Home from '../containers/Home';
import File from '../containers/File';
import User from '../containers/User';
import UserAdd from '../containers/UserAdd';
import Application from '../containers/Application';
import Lost from '../containers/Lost';
import TaskList from '../containers/TaskList';
import TaskInfo from '../containers/TaskInfo';
import Login from '../containers/Login';

import { selectTasksMenu } from '../actions'

//Layout组件
const { Header, Footer, Sider, Content } = Layout;
//按钮组件
const SubMenu = Menu.SubMenu;

class App extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  test = () =>{
  }

  onOpenChange = (openKeys) =>{
    let isClose = openKeys.length;
    if(isClose){
      this.props.dispatch(selectTasksMenu(-1)); //优先级队列选中项初始化
    }
  }

  render() {
    return (
      <Router>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" ></div>
          <Menu
            onOpenChange={this.onOpenChange}
            defaultSelectedKeys={['user']}
            theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="user">
              <Link to="/user"><Icon type="user" /><span>角色管理</span></Link>
            </Menu.Item>
            <Menu.Item key="queue">
              <Link to="/queue"><Icon type="rocket" /><span>任务队列</span></Link>
            </Menu.Item>
            <Menu.Item key="application">
              <Link to="/application"><Icon type="codepen" /><span>应用管理</span></Link>
            </Menu.Item>
            <Menu.Item key="file">
              <Link to="/file"><Icon type="file" /><span>文件管理</span></Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login"><Icon type="file" /><span>测试登录</span></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '16px 16px', padding: 24, background: '#fff'}}>
          <Switch>
                <Route exact={true} path="/user" component={User}></Route>
                <Route exact={true} path="/user/new" component={UserAdd}></Route>

                <Route path="/queue" component={TaskList}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/application" component={Application}></Route>
                <Route exact={true} path="/file" component={File}></Route>

                <Route component={Lost}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    currenQueueType: state.selectTasksMenu,
    currenQueueList: state.taskListByType,
    userList:state.getUserList
  };
}

export default connect(mapStateToProps)(App);

