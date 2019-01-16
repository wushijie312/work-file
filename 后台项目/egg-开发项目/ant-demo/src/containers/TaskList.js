import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert, List, Button,Select,Modal,Table,Icon, Divider,Popconfirm,Input,Progress} from 'antd';
import { requestTasks ,selectTasksMenu ,fetchTasks,removeTask,enqueueTask,enqueueALLTask} from '../actions'
import './TaskList.css';
import { showTime } from '../utils/utils'
const Option = Select.Option;
const confirm = Modal.confirm;

const PRIORITY = {
  '1':'高',
  '2':'中',
  '3':'低',
}
//优先级任务队列视图
class TaskList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'name':'内部状态!'
    }
    //定义表格样式
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text,item) => <a href="#" onClick={() => { this.info(item) }}>{text}</a>
    }, {
      title: '接口名',
      dataIndex: 'apiName',
      key: 'apiName',
      render: text => <span>{text}</span>,
    }, {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: text => <span>{PRIORITY[text]}</span>,
    },  {
      title: '失败次数',
      dataIndex: 'retry',
      render: (text,item) => <span>{text || 0}/{item.maxRetry}</span>,
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: (text,item) => <span>{showTime(item.updateTime)}</span>
    }, {
      title: '日志摘要',
      dataIndex: 'log',
      render: (text,item) => <span style={{width:280,height:30,display:'block',overflow: 'hidden'}}>{item.report ? item.report.body : '暂无'}</span>
    },{
      title: 'Action',
      key: 'action',
      render: (text, item) => {
        return (
              <div>
                {
                this.props.currenQueueType === 4 && 
                <span>
                  <Popconfirm title='重新进入任务队列?' onConfirm={() => this.props.dispatch(enqueueTask(item)) }>
                    <a href="#">入列</a>
                  </Popconfirm>
                  <Divider type="vertical" />
                  <Popconfirm title='确定删除该任务(日志仍会保留)?' onConfirm={() => this.props.dispatch(removeTask(item)) }>
                    <a href="#">删除</a>
                  </Popconfirm>
                  <Divider type="vertical" />
                </span>
                }
                <a href="#" onClick={() => { this.info(item) }}>详情</a> 
                </div>
        )
      },
    }];

  }

  componentDidMount() {
    //默认请求容错队列
    let { currenQueueType ,dispatch } = this.props;
    dispatch(fetchTasks(currenQueueType));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch ,currenQueueType } = nextProps
    //命中切换队列类型
    if(currenQueueType !== this.props.currenQueueType){
      // dispatch(selectTasksMenu(currenQueueType));
      dispatch(fetchTasks(currenQueueType));
    }
  }

  onEnqueue = () => {
    this.props.dispatch(enqueueALLTask())
    console.log(this.state);
  }

  onRefresh = () =>{
    let { currenQueueType ,dispatch } = this.props;
    dispatch(fetchTasks(currenQueueType));
  }

  showDeleteConfirm = (item) =>{
    let dispatch = this.props.dispatch;
    confirm({
      title: '确定要删除这个任务?',
      content: '删除后不可恢复,请谨慎操作!',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        dispatch(removeTask(item));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

showEnqueueConfirm = (item) =>{
  let dispatch = this.props.dispatch;
  confirm({
    title: '确定要把这个任务重新入列?',
    content: '入列后会被放入高优先级队列 !',
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk() {
      dispatch(enqueueTask(item));
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

info = (item) => {
  Modal.info({
    title: '任务详情',
    width:700,
    maskClosable:true,
    content: (
      <pre style={{height:'500px',fontSize: '11px',color:'black'}}>
        {JSON.stringify(item,null,2)}
      </pre>
    ),
    onOk() {},
    okText: 'Close'
    });
  }

  handleChange = (type) => {
    setTimeout(()=>{
      this.props.dispatch(selectTasksMenu(Number.parseInt(type)));
    },100);
  }

  renderItemView = (currenQueueType,item) => {

    let diff = Date.now() - item.updateTime;
    diff = Math.ceil(30 - diff/1000/60 );
    return <div>
                <div>{item.id}</div>
                <div>{item.apiName}</div>
                { 
                  currenQueueType === 4 
                  &&
                  //错误日志信息
                  <div>
                    <div>{diff} 分钟后重推</div>
                    <div>剩余次数: {item.retry}/{item.maxRetry}</div>
                    { item.report && <div>日志: {item.report.status} / { item.report.body}</div> }
                  </div>
                }
            </div>
  }

  render() {
    let {
      currenQueueType,
      currenQueueList,
      dispatch
    } = this.props;

    console.log(currenQueueList)
    let dataSource = currenQueueList || [];
    return(
      <div>
        <div className='top'>
        <Select defaultValue='4' style={{ width: 120 }} onChange={ this.handleChange }>
          <Option value='1'>高优先级</Option>
          <Option value='2'>中优先级</Option>
          <Option value='3'>低优先级</Option>
          <Option value='4'>容错队列</Option>
        </Select>
        <div>
          <Button className="top_btn" onClick={ this.onEnqueue }>全部入列</Button>
          <Button className="top_btn" onClick={ this.onRefresh }>刷新</Button>
        </div>
        </div>
        <Table  style={{marginTop:'10px'}} bordered rowKey='id' columns={this.columns}  dataSource={dataSource} />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    currenQueueType: state.selectTasksMenu,
    currenQueueList: state.taskListByType
  };
}
export default connect(mapStateToProps)(TaskList);
