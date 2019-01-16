import request from '../utils/request';
import { notification } from 'antd';

//任务队列
export const RECEIVE_TASKS = 'RECEIVE_TASKS' //开始接收任务列表
export const REQUEST_TASKS = 'REQUEST_TASKS' //开始请求任务列表
export const FETCH_TASKS = 'FETCH_TASKS' //开发访问后台获取任务列表
export const SELECT_TASKS = 'SELECT_TASKS' //选中任务列表（高、中、低、延迟）

//角色列表
export const RECEIVE_USERS = 'RECEIVE_USERS' //开始接收任务列表
export const REQUEST_USERS = 'REQUEST_USERS' //开始请求任务列表
export const FETCH_USERS = 'FETCH_USERS' //开发访问后台获取任务列表

//全局通知
const openNotificationWithIcon = (type,message) => {
  notification[type]({
    message: '提示',
    description: message,
    duration: .8,
  });
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjA1OTI4MjAsImV4cCI6MTUyMTE5NzYyMCwiaXNzIjoiTFpTWiIsImp0aSI6IjExMTE3YmI0LWM2ZDItNDQwMC04MTlkLWNmOGNiMmUzMWJkMiIsImlkIjoxfQ.R15VQ2bzJczHleq1_EkLF3x7gc-voqfOgbLDE3yHJVo";

////////////////////////////////////////////////////////////////////////////////////////////////////
export const requestUsers = (taskType) => {
  return ({
    type: REQUEST_USERS,
    taskType
  })
}

export const receiveUsers = (users = []) => {
  return ({
    type: RECEIVE_USERS,
    users
  })
}

export const editUser = (newInfo) => (dispatch,getState) => {
  return fetch(`http://127.0.0.1:7001/user/edit`,
            {
              method: "PUT",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify(newInfo)
            }
          )
          .then(response => response.json())
          .then(json => {
            if(json.code === 0){
              openNotificationWithIcon('success','修改成功');
            }else{
              throw new Error(json.msg)
            }
            
          })
          .catch( e => {
            openNotificationWithIcon('error',e.message);
          });
}

export const login = (data) => (dispatch,getState) => {
  return fetch(`http://127.0.0.1:7001/user/login`,
            {
              method: "POST",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify(data)
            }
          )
          .then(response => response.json())
          .then(json => {
            if(json.code === 0){
              openNotificationWithIcon('success','登录成功');
            }else{
              throw new Error(json.msg)
            }
            
          })
          .catch( e => {
            openNotificationWithIcon('error',e.message);
          });
}

export const addUser = (newInfo) => (dispatch,getState) => {
  console.log(`===> ${JSON.stringify(newInfo)}`)
  return fetch(`http://127.0.0.1:7001/user/add`,
            {
              method: "POST",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify(newInfo)
            }
          )
          .then(response => response.json())
          .then(json => {
            if(json.code === 0){
              openNotificationWithIcon('success','添加成功');
            }else{
              throw new Error(json.msg)
            }
            
          })
          .catch( e => {
            openNotificationWithIcon('error',e.message);
          });
}

export const removeUser = (id) => (dispatch,getState) => {

  let  { getUserList } = getState();
  console.log(getState())
  let filtered = getUserList.filter((element) => element.id !== id );
  dispatch(receiveUsers(filtered));

  return fetch(`http://127.0.0.1:7001/user/remove`,
            {
              method: "DELETE",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify({id:id})
            }
          )
          .then(response => response.json())
          .then(json => {
            if(json.code === 0){
              openNotificationWithIcon('success','删除成功');
            }else{
              throw new Error(json.msg)
            }
            
          })
          .catch( e => {
            openNotificationWithIcon('error',e.message);
          }).finally(()=>{
            console.log(`----> 删除用户: ${id}`)
          });

}

export const fetchUsers = () => (dispatch,getState) => {
  dispatch(requestUsers());
  return fetch('http://127.0.0.1:7001/user/all',
          {
            method: "GET",
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token':token
            }
          })
          .then(response => response.json())
          .then(json => {
            let users = json.data;
            dispatch(receiveUsers(users))
          });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const selectTasksMenu = (taskType) => {
  return ({
    type: SELECT_TASKS,
    taskType
  })
}

export const requestTasks = (taskType) => {
  return ({
    type: REQUEST_TASKS,
    taskType
  })
}

export const receiveTasks = (tasks) => {
  return ({
    type: RECEIVE_TASKS,
    tasks
  })
}

export const fetchTasks = (taskType) => (dispatch,getState) => {
  dispatch(requestTasks(taskType));
  return fetch(`http://127.0.0.1:7001/queue/list?type=${taskType}&currentPage=0&pageSize=10`,
          {
            method: "GET",
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token':token
            }
          })
          .then(response => response.json())
          .then(json => {
            let list = json.data.list;
            dispatch(receiveTasks(list))
          });
}

export const removeTask = (task) => (dispatch,getState) => {

  let  { selectTasksMenu ,taskListByType} = getState();
  let id = task.id;
  let filtered = taskListByType.filter((element) => element.id !== id );
  dispatch(receiveTasks(filtered));

  return fetch(`http://127.0.0.1:7001/queue/remove`,
            {
              method: "delete",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify(task)
            }
          )
          .then(response => response.json())
          .then(json => {
            openNotificationWithIcon('success','删除成功');
          })
          .catch( e => {
            openNotificationWithIcon('error',`删除失败: ${e.message}`);
          });
}

export const enqueueTask = (task) => (dispatch,getState) => {

  let  { selectTasksMenu ,taskListByType} = getState();
  let id = task.id;
  let filtered = taskListByType.filter((element) => element.id !== id );
  dispatch(receiveTasks(filtered));

  return fetch(`http://127.0.0.1:7001/queue/enqueue`,
            {
              method: "put",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
              },
              body:JSON.stringify(task)
            }
          )
          .then(response => response.json())
          .then(json => {
            openNotificationWithIcon('success','入列成功');
          })
          .catch( e => {
            openNotificationWithIcon('error',`入列失败: ${e.message}`);
          });
}

//全部入列
export const enqueueALLTask = (task) => (dispatch,getState) => {
  openNotificationWithIcon('success','正在入列...');
  return fetch(`http://127.0.0.1:7001/queue/enqueueAll`,
          {
            method: "GET",
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token':token
            }
          })
          .then(response => response.json())
          .then(json => {
            openNotificationWithIcon('success','全部入列成功!');
            dispatch(receiveTasks([]));
          })
          .catch( e => {
            openNotificationWithIcon('error',`入列失败: ${e.message}`);
          });
}