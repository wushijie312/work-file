//微信用户信息业务模块
import { request } from '../utils/request.js'
import { URL, KEYSTORAGE,TYPES } from '../src/const.js'
const md5 = require('../style/md5.min.js');


//微信小程序登录
function getTemplate(verifyCode) {
  let sessionid = wx.getStorageSync('SessionId');
  let authoriType=0;
  
    var encryHeader = md5(`sessionid:${sessionid}&verifyCode:${verifyCode}&authoriType:${authoriType}&key:${TYPES.codeKey}`).toLowerCase();
    return new Promise((resolve, reject) => {
      request({
        url: URL.URL_GETLOGIN,
        method: 'POST',
        // methooooood:1111111,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Encry':encryHeader
        },
        data:{
          sessionid:sessionid,
          verifyCode:verifyCode,
          authoriType:authoriType
        }
      })
      .then((response)=>{
        if(response.Success){
          var data=JSON.parse(response.Data);
          resolve({
            EmailSuffix:data.EmailSuffix
          });
        } else {
          // var response={message:'sadas'}
          reject(response); //视图层显示错误信息
        }
     });
    });
 
  
}

export {
  getTemplate
}