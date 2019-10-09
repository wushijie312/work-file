/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'

const AXIOS_CONFIG_TMEOUT = 30000; //超时时间
var last_unauthorized_time = 0;  //上次发生401错误的时间

//请求拦截器
axios.interceptors.request.use(config => {
    // loading
    // console.log('success-config:',config);
    return config
}, error => {
  // console.log('error-config:',config);

    return Promise.reject(error)
})

//相应拦截器
axios.interceptors.response.use((res) => {
  console.log('success-res:',res);
    return res
}, (error) => {
  console.log('error-res:',error);
    //获取HTTP 401 状态码
    if (error && error.response && error.response.status === 401) {
        if (Date.now() - last_unauthorized_time < 6000) { //如果4000毫秒内连续发生401错误,则只接受一个防止多次弹窗
        } else {
            last_unauthorized_time = Date.now();
            let body = error.response.data;
            try {
                //解析相应体
                body = typeof body === 'string' ? JSON.parse(body) : body;
            } catch (e) {
                // console.log(e);
            } finally {
                if (body.code === 1) {  //登陆失效 {code: 1, msg: "未授权"}
                    localStorage.clear(); //清除本地的数据
                    // alert('登录状态失效,请重新登录!');
                    <a-alert type="error" message="Error text" banner />
                    window.location.href = '/'//进去登录页面
                }
            }
        }
    } else {
        //处理未知错误
        alert(error.response.data || error); //未知错误 400 404 500 ...
    }
    return Promise.reject(error)
})

export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      } `+`
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

/*
const response = await ajax()
const result = response.data

const resule = await ajax()
 */

 
// import axios from 'axios';
// export default function ajax(url,data={},type="get"){
//    new Promise((res,rej)=>{
//     let promise;
//     if(type =='get'){
//         // 准备url query参数数据
//         let dataStr='';//数据拼接字符串
//         Object.keys(data).forEach(key=>{
//             dataStr+=key+'='+data[key]+'&'
//         });
//         if(dataStr!=''){
//             dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'));
//             url=url+'?'+dataStr
//         }
//         // 发送get请求
//         promise=axios.get(url);

//     }else{
//         // 发送post请求
//         promise=axios.post(url,data);
//     }
//     promise.then(function(response){
//         // 成功调用
//         res(response.data);
//     }).catch(function(e){
//         // 失败调用
//         rej(err);
//     });
//     // return promise;
//    });
// }