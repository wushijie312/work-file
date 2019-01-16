import React from 'react';
import './style.css';

import request from '../../utils/request';
import config from '../../const/config';

//antd组件
import { Layout,Menu,Icon,Avatar,Dropdown} from 'antd';
//路由组件
import { Route, NavLink,Switch } from 'react-router-dom'
//状态机
import { connect } from 'react-redux';

//页面
import File from '../../containers/File/File.jsx';
import User from '../../containers/User/User.jsx';
import Register from '../../containers/Register/Register.jsx';
import Application from '../../containers/Application/Application.jsx';
import NotFound from '../../containers/NotFound/NotFound.jsx';
import TaskList from '../../containers/TaskList/TaskList.jsx';
import Login from '../../containers/Login/Login.jsx';

import { selectTasksMenu ,logout,receiveLoginSuccess} from '../../actions'

//Layout组件
const { Header, Sider, Content } = Layout;

class Main extends React.Component {

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
    let { currentUser ,dispatch,history} = this.props;
    return (
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" ></div>
              <Menu
                onOpenChange={this.onOpenChange}
                defaultSelectedKeys={['queue']}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}>
                <Menu.Item key="user">
                  <NavLink to="/main/user"><Icon type="user" /><span>角色管理</span></NavLink>
                </Menu.Item>
                <Menu.Item key="queue">
                  <NavLink to="/main/queue"><Icon type="rocket" /><span>任务队列</span></NavLink>
                </Menu.Item>
                <Menu.Item key="application">
                  <NavLink to="/main/application"><Icon type="codepen" /><span>应用管理</span></NavLink>
                </Menu.Item>
                <Menu.Item key="file">
                  <NavLink to="/main/file"><Icon type="file" /><span>文件管理</span></NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
            <Header style={{ background: '#fff', padding: 0 ,  display: 'flex' ,justifyContent: 'space-between'}}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            <Dropdown overlay={
              <Menu selectedKeys={[]} onClick={()=>{
                // request(config.URL.USER_TEST,{
                //   method:'GET'
                // });
                //删除登录信息
                // history.push('/')
                this.props.history.replace('/');
                dispatch(logout());
                dispatch(receiveLoginSuccess({}))
              }}>
                <Menu.Item key="logout">
                <Icon style={{ margin:10 }} type="logout" />退出登录</Menu.Item>
              </Menu>
              }>
              <span>
              <Avatar size="small" className='Avatar' src={currentUser.avatar} />
              <span style={{marginLeft:5,marginRight:16}}>{currentUser.nickName}</span></span>
            </Dropdown>
            </Header>
            <Content style={{ margin: '16px 16px', padding: 24, background: '#fff'}}>
            <Switch>
              <Route exact path="/main/user" component={User}></Route>
              <Route exact path="/main/user/add" component={Register}></Route>
              <Route exact path="/main/queue" component={TaskList}></Route>
              <Route exact path="/main/login" component={Login}></Route>
              <Route exact path="/main/application" component={Application}></Route>
              <Route exact path="/main/file" component={File}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    currenQueueType: state.selectTasksMenu,
    currenQueueList: state.taskListByType,
    userList:state.getUserList,
    currentUser:state.currentLoginInfo
  };
}

export default connect(mapStateToProps)(Main);

