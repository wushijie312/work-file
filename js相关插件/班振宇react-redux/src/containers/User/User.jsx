import React from 'react';
import { connect } from 'react-redux';
import { Button,Modal,Table, Divider,Popconfirm,Input } from 'antd';
import { fetchUsers,removeUser,receiveUsers,editUser } from '../../actions'
import {  Link } from 'react-router-dom'
import './style.css';

const confirm = Modal.confirm;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

//优先级任务队列视图
class User extends React.Component {

  constructor(props) {
    super(props);

    //定义表格样式
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (text, record) => this.renderColumns(text, record, 'nickName'),
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => <div href="#">{text ? '男' : '女'}</div>,
    },  {
      title: '职位',
      dataIndex: 'job',
      render: (text, record) => this.renderColumns(text, record, 'job'),
    }, {
      title: '邮箱',
      dataIndex: 'email',
      render: (text, record) => this.renderColumns(text, record, 'email'),
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      render: (text, record) => this.renderColumns(text, record, 'phone'),
    },{
      title: '用户编辑',
      key: 'action',
      render: (text, user) => {
        const { editable } = user;
        return (
            <div>
            {
              editable ?
                <span>
                  <a onClick={() => this.save(user.id)}>保存</a>
                  &nbsp;&nbsp;&nbsp;
                  <Popconfirm title="确定取消编辑?" onConfirm={() => this.cancel(user.id)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                :
                <span>
                <Popconfirm title='你确定要删除该账号?' onConfirm={() => this.onDelete(user.id)}>
                  <a href="#">删除</a>
                </Popconfirm>
                <Divider type="vertical" />
                <a href="#" onClick={() => { this.edit(user.id) }}>修改</a>
                </span>
            }
            </div>
        )
      },
    }];

  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }

  handleChange(value, id, column) {
    let { userList, dispatch } = this.props;
    const newData = [...userList];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      dispatch(receiveUsers(newData))
    }
  }

  componentDidMount() {
    //默认请求容错队列
    this.props.dispatch(fetchUsers());
    this.cacheData = [];
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch ,currenQueueType } = nextProps
    //命中切换队列类型
    if(currenQueueType !== this.props.currenQueueType){
      // dispatch(selectTasksMenu(currenQueueType));
      dispatch(fetchUsers());
    }

    //缓存一份用户列表
    let { userList } = nextProps;
    //当放心数组中有值时仅备份一个数据(注意拷贝方式)
    if(this.cacheData.length < 1){
      this.cacheData = userList.map(item => ({ ...item }));
    }
  }

  onEnqueue = () => {

  }

  onRefresh = () =>{
    let { dispatch } = this.props;
    dispatch(fetchUsers());
  }

  onDelete = (id) =>{
    this.props.dispatch(removeUser(id));
  }

showEnqueueConfirm = (item) =>{
  // let dispatch = this.props.dispatch;
  confirm({
    title: '确定要把这个任务重新入列?',
    content: '入列后会被放入高优先级队列 !',
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk() {
      // dispatch(enqueueTask(item));
    },
    onCancel() {
    },
  });
}

//编辑
edit(id) {
  let { userList, dispatch } = this.props;
  const newData = [...userList];
  const target = newData.filter(item => id === item.id)[0];
  if (target) {
    target.editable = true;
    dispatch(receiveUsers(newData));
  }
}

//取消编辑
cancel = (id) => {
  let { userList, dispatch } = this.props;
  const newData = [...userList];
  const target = newData.filter(item => id === item.id)[0];
  if (target) {
    let originalUserInfo = this.cacheData.filter(item => id === item.id)[0];
    Object.assign(target, originalUserInfo); //从备份中还原
    delete target.editable;
    dispatch(receiveUsers(newData)) //还原state中的数据

  }
}

//保存编辑
save (id){
  let { userList, dispatch } = this.props;
  const newData = [...userList];
  const target = newData.filter(item => id === item.id)[0];
  if (target) {
    delete target.editable;
    dispatch(editUser(target));
    dispatch(receiveUsers(newData));
  }
}

info = (item) => {
  Modal.info({
    title: '任务详情',
    width:700,
    maskClosable:true,
    content: (
      <pre style={{height:'500px',fontSize: '2px'}}>
        {JSON.stringify(item,null,2)}
      </pre>
    ),
    onOk() {},
    });
  }

  render() {
    let { userList,match} = this.props;
    let dataSource = userList || [];
    return(<div>
         <Link to={`${match.url}/add`}><Button style={{marginBottom:"4px"}}>新增用户</Button></Link>
         <Table bordered rowKey='id' columns={this.columns} dataSource={dataSource} />
         </div>)
  }
}

function mapStateToProps(state) {
  return {
    userList:state.getUserList
  };
}
export default connect(mapStateToProps)(User);
