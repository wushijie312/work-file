import { RequestLogger } from './request.log.js';
import { EVENTS } from '../src/const.js'
import events from '../src/events.js';

 //通用HTTP请求方法
 //注意返回值 {"code":0,"msg":"成功"} 或者 {"code":1,"msg":"失败"}
const requestUploadFile = (config) => {

  const logger = new RequestLogger();

  //默认配置
  let defaultConfig = {
    header:{
      'content-type': 'application/json', // 请求体类型默认值
      token: wx.getStorageSync('token') || '' //请求凭证
    },
    method: 'GET' //请求方法OPTIONS, GET, HEAD, POST, PUT, DELETE
  }
  let mergeHeader = config.header || 
    Object.assign(config.header || {},defaultConfig.header);
  let mergeMethod = config.method || defaultConfig.method;
  
  let realConfig = Object.assign(defaultConfig,config);
  logger.begin(realConfig); //打印请求

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: realConfig.url, //接口地址
      method: realConfig.method.toUpperCase(), //请求类型
      formData: realConfig.formData, //请求体
      header: realConfig.header, //请求头
      name: realConfig.name, 
      filePath: realConfig.filePath,
      //成功钩子
      success: (res) => {
        let data = res.data;
        let statusCode = res.statusCode;
        logger.end(res); //打印响应
        if(statusCode === 200){
          resolve(res.data);
        } else if(statusCode === 401){
          events.post(res,EVENTS.EVENT_401);  //登录失效
        }else { //封装400-500之间的错误
          resolve(res.data);
          // resolve({ code: 1, msg: `${res.data}(${statusCode})`});
        }
      },

      //失败钩子（HTTP客户端配置出错）
      fail:(e) => {
        logger.error(e); //打印错误
        resolve({ code: 1, msg: e.errMsg || e.message });
      },

      //结束事件
      complete:() =>{
        logger.print();
      }
    });
  });
}

export{
  requestUploadFile
}