//微信用户信息业务模块
import { request } from '../utils/request.js'
import { URL, TYPES } from '../src/const.js'
const md5 = require('../style/md5.min.js');

//微信小程序登录
function enterMail(emails) {
  var sessionid = wx.getStorageSync('SessionId');
  var encryHeader = md5(`sessionid:${sessionid}&email:${emails}&key:${TYPES.codeKey}`).toLowerCase();
  return new Promise((resolve, reject) => {
    request({
      url: URL.URL_SENDMAIL,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Encry': encryHeader
      },
      data: {
        sessionid:sessionid,
        email:emails
      }
    }).then((response) => {
      if (response.Success) {
        console.log("success");
        // var response = JSON.parse(response.Message);
        resolve();
      }else {
        reject(response); //视图层显示错误信息
      }
    }).catch(function (e) {
        reject(e);
    });
  });
}


export {
    enterMail
}