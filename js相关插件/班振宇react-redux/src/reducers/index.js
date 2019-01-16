import { combineReducers } from 'redux'

//导入Action创建函数
import {

  //任务队列
  SELECT_TASKS,
  RECEIVE_TASKS,
  REQUEST_TASKS,

  //角色管理
  RECEIVE_USERS,
  REQUEST_USERS,
  FETCH_USERS,

  //常用事件
  REDIRECT_TO_MAIN
} from '../actions'

// 当前队列分类类型
const selectTasksMenu = (state = 4, action) => {
  switch (action.type) {
    case SELECT_TASKS:
      return Number.parseInt(action.taskType)
    default:
      return state
  }
}

//任务列表函数
const taskListByType = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return action.tasks || state;
    default:
      return state
  }
}

//角色列表函数
const getUserList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
    console.log(action)
      return action.users || state;
    default:
      return state
  }
}

//用户登录状态
const currentLoginInfo = (state = {},action) => {
  switch (action.type) {
    case REDIRECT_TO_MAIN:
      return action.loginInfo;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectTasksMenu,
  taskListByType,
  getUserList,
  currentLoginInfo
})

export default rootReducer
