import axios from 'axios';
// import { Message } from 'element-ui';
// const AXIOS_CONFIG_TMEOUT = 30000; //超时时间
// var last_unauthorized_time = 0;  //上次发生401错误的时间

//请求拦截器
axios.interceptors.request.use(config => {

  // loading
  if (localStorage.getItem('token')) {
    // config.headers.token =  localStorage.getItem('token');
  }
  return config
}, error => {
  return Promise.reject(error)
})

//相应拦截器
axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  //获取HTTP 401 状态码
  // if (error && error.response && error.response.status === 401) {
  //   if (Date.now() - last_unauthorized_time < 6000) { //如果4000毫秒内连续发生401错误,则只接受一个防止多次弹窗
  //   } else {
  //     last_unauthorized_time = Date.now();
  //     let body = error.response.data;
  //     try {
  //       //解析相应体
  //       body = typeof body === 'string' ? JSON.parse(body) : body;
  //     } catch (e) {
  //       // console.log(e);
  //     } finally {
  //       if (body.code === 1) {  //登陆失效 {code: 1, msg: "未授权"}
  //         localStorage.clear(); //清除本地的数据
  //         // alert('登录状态失效,请重新登录!');
  //         Message({
  //           showClose: true,
  //           message: '错了哦，这是一条错误消息',
  //           type: 'error'
  //         });
  //         window.location.href = '/'//进去登录页面
  //       }
  //     }
  //   }
  // } else {
  //   //处理未知错误
  //   alert(error.response.data || error); //未知错误 400 404 500 ...
  // }
  return Promise.reject(error)
})

// axios.defaults.timeout = 5000;
// axios.defaults.baseURL ='';


// //http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );


// //http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {},headers) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    },{headers: {'Content-Type': headers||'application/json'}})
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {},headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, data,{headers: {'Content-Type': headers||'application/json'}})
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {},headers) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data,{headers: {'Content-Type': headers||'application/json'}})
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {},headers) {
  return new Promise((resolve, reject) => {
    axios.put(url, data,{headers: {'Content-Type': headers||'application/json'}})
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}