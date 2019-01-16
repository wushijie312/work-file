//微信用户信息业务模块
import { request } from '../utils/request.js'
import { URL, TYPES } from '../src/const.js'
const md5 = require('../style/md5.min.js');

//微信小程序登录
function getListBagde() {
  var sessionid = wx.getStorageSync('SessionId');
  var encryHeader = md5(`sessionid:${sessionid}&key:${TYPES.codeKey}`).toLowerCase();
  return new Promise((resolve, reject) => {
    request({
      url: URL.URL_GETLISTBAGDE,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Encry': encryHeader
      },
      data: {
        sessionid: sessionid
      }
    }).then((response) => {
      if (response.Success) {
        var response = JSON.parse(response.Message);
        resolve({
          templateList: response,
          templateId: response[0].Id
        });
      }else {
        reject(response); //视图层显示错误信息
      }
    }).catch(function (e) {
      reject(e);
    });
  });
}

function getTemplate( templateId) {
  var sessionid= wx.getStorageSync('SessionId');
  let encryHeader = md5(`sessionid:${sessionid}&templateId:${templateId}&key:${TYPES.codeKey}`).toLowerCase();
  return new Promise((resolve, reject) => {
    request({
      url: URL.URL_GETTEMPLATE,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Encry':encryHeader
      },
      data:{
        sessionid:sessionid,
        templateId:templateId
      }
    })
    .then((response) => {
      if (response.Success) {
        var template=JSON.parse(response.Message);
        resolve({
          template:template
        }); //视图层需要的参数
      } else {
        reject(response); //视图层显示错误信息
      }
    }).catch(function (e) {
      reject(e);
    });
  });
}

export {
  getListBagde,
  getTemplate
}