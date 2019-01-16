import {notification} from 'antd';
import {URL} from '../const/config';
import request from '../utils/request';

//任务队列
export const RECEIVE_TASKS = 'RECEIVE_TASKS' //开始接收任务列表
export const REQUEST_TASKS = 'REQUEST_TASKS' //开始请求任务列表
export const FETCH_TASKS = 'FETCH_TASKS' //开发访问后台获取任务列表
export const SELECT_TASKS = 'SELECT_TASKS' //选中任务列表（高、中、低、延迟）

//角色列表
export const RECEIVE_USERS = 'RECEIVE_USERS' //开始接收任务列表
export const REQUEST_USERS = 'REQUEST_USERS' //开始请求任务列表
export const FETCH_USERS = 'FETCH_USERS' //开发访问后台获取任务列表

//常用事件
export const REDIRECT_TO_MAIN = 'REDIRECT_TO_MAIN'; //登录成功跳转进主页

//全局通知
const openNotificationWithIcon = (type, message) => {
  notification[type]({message: '提示', description: message, duration: .8});
};

export const requestUsers = (taskType) => {
  return ({type: REQUEST_USERS, taskType})
}

export const receiveUsers = (users = []) => {
  return ({type: RECEIVE_USERS, users})
}

export const receiveLoginSuccess = (loginInfo) => {
  return ({type: REDIRECT_TO_MAIN, loginInfo})
}

export const editUser = (newInfo) => (dispatch, getState) => {
  return request(`${URL.USER_EDIT}`, {
    method: "PUT",
    body: newInfo
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', '修改成功');
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

export const login = (data) => (dispatch, getState) => {
  return request(`${URL.USER_LOGIN}`, {
      method: "POST",
      body: data
    })
    .then(result => {
      console.log(result)
      if (result.code === 0) {
        openNotificationWithIcon('success', '登录成功');
        localStorage.setItem('loginInfo', JSON.stringify(result.data));
        dispatch(receiveLoginSuccess(result.data));
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

export const logout = () => (dispatch, getState) => {
  return request(`${URL.USER_LOGOUT}`, {
    method: "DELETE",
    body: {}
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', '注销成功');
        dispatch(receiveLoginSuccess({}))
        localStorage.removeItem('loginInfo');
      } else {
        openNotificationWithIcon('error', result.msg);
      }

    });
}

export const addUser = (newInfo) => (dispatch, getState) => {
  return request(`${URL.USER_ADD}`, {
      method: "POST",
      body: newInfo
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', '添加成功');
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

export const removeUser = (id) => (dispatch, getState) => {

  let {getUserList} = getState();
  let filtered = getUserList.filter((element) => element.id !== id);
  dispatch(receiveUsers(filtered));

  return request(`${URL.USER_REMOVE}`, {
      method: "DELETE",
      body: { id: id }
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', '删除成功');
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });

}

export const fetchUsers = () => (dispatch, getState) => {
  dispatch(requestUsers());
  return request(URL.USER_ALL)
    .then(result => {
      if (result.code === 0) {
        dispatch(receiveUsers(result.data))
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////

export const selectTasksMenu = (taskType) => {
  return ({type: SELECT_TASKS, taskType})
}

export const requestTasks = (taskType) => {
  return ({type: REQUEST_TASKS, taskType})
}

export const receiveTasks = (tasks) => {
  return ({type: RECEIVE_TASKS, tasks})
}

export const fetchTasks = (taskType) => (dispatch, getState) => {
  dispatch(requestTasks(taskType));
  return request(`${URL.QUEUE_LIST}type=${taskType}&currentPage=0&pageSize=10`)
    .then(result => {
      if (result.code === 0) {
        dispatch(receiveTasks(result.data.list))
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

export const removeTask = (task) => (dispatch, getState) => {

  let {taskListByType} = getState();
  let id = task.id;
  let filtered = taskListByType.filter((element) => element.id !== id);
  dispatch(receiveTasks(filtered));

  return request(`${URL.QUEUE_REMOVE}`, {
      method: "delete",
      body: task
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', result.msg);
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

export const enqueueTask = (task) => (dispatch, getState) => {

  let {taskListByType} = getState();
  let id = task.id;
  let filtered = taskListByType.filter((element) => element.id !== id);
  dispatch(receiveTasks(filtered));

  return request(`${URL.QUEUE_ENQUEUE}`, {
      method: "put",
      body: JSON.stringify(task)
    })
    .then(result => {
      if (result.code === 0) {
        openNotificationWithIcon('success', result.msg);
      } else {
        openNotificationWithIcon('error', result.msg);
      }
    });
}

//全部入列
export const enqueueALLTask = (task) => (dispatch, getState) => {
  openNotificationWithIcon('success', '正在入列...');
  return fetch(URL.QUEUE_ENQUEUE_ALL)
    .then(result => {
      if(result.code === 0){
        openNotificationWithIcon('success', '全部入列成功!');
        dispatch(receiveTasks([]));
      }else{
        openNotificationWithIcon('error', result.msg);
      }
    });
}