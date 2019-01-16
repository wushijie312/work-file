//微信用户信息业务模块
import { request } from '../utils/request.js'
import {error_normal } from '../utils/popup.js'
import { URL,TYPES } from '../src/const.js'
const md5 = require('../style/md5.min.js');
//微信小程序登录

function wxInfo() {
  wx.login({
    success: function (res) {
      var code=res.code;
      if(code){
        var resValues = 'code:'+code+'&key:'+TYPES.codeKey;
        var encryHeader=md5(resValues).toLowerCase();
        return new Promise((resolve, reject) => {
          request({
            url: URL.URL_GETINFO,
            method: 'GET',
            header: {
              'content-type': 'application/json',
              'Encry':encryHeader
            },
            data: {
              code: code
            }
          })
          .then((response)=>{
            if (response.Success) {
              wx.setStorageSync('SessionId',response.Message);
              resolve("");              
              wx.redirectTo({
                url: '../login/index'
              });
            }else{
              // var response={me}
              error_normal(response);
            }              
          }).catch(function (e) {
            error_normal(e);
          });
        });
      }
    }
  })
   
}


export {
  wxInfo
}