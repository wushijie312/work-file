//微信用户信息业务模块
import { request } from '../utils/request.js'
import { requestUploadFile } from '../utils/requestUploadFile.js'
import { URL, TYPES } from '../src/const.js'
const md5 = require('../style/md5.min.js');

function getOpearImg(username,userClass) {
  var sessionid= wx.getStorageSync('SessionId');
  var template=wx.getStorageSync('template');
  var templateId=template.Id;
  template.ListDesign_TemplateEditText[1].Text=username;
  template.ListDesign_TemplateEditText[0].Text=userClass;   
  let encryHeader = md5(`sessionid:${sessionid}&templateId:${templateId}&key:${TYPES.codeKey}`).toLowerCase();
  return new Promise((resolve, reject) => {
    request({
      url: URL.URL_OPEARIMG,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Encry':encryHeader
      },
      data:{
        sessionid:sessionid,
        templateId:templateId,
        textJson:JSON.stringify(template.ListDesign_TemplateEditText) 
      }
    })
    .then((response) => {
      if (response.Success) {
        var srcs=response.Message;
        resolve({
          srcs:srcs
        }); //视图层需要的参数
      } else {
        reject(response); //视图层显示错误信息
      }
    }).catch(function (e) {
      reject(e);
    });
  });
}

//微信小程序登录
function getUploadFile(avatar) {
  var sessionid = wx.getStorageSync('SessionId');
  var template=wx.getStorageSync('template');
  console.log(template);
  var templateId=template.ListDesign_TemplateEditImg[0].Id;
  var encryHeader = md5(`sessionid:${sessionid}&imgid:${templateId}&key:${TYPES.codeKey}`).toLowerCase();
  return new Promise((resolve, reject) => {
    requestUploadFile({
      url: URL.URL_UPLOADIMG,
      method: 'POST',
      filePath: avatar,
      name: 'uploadavatar', 
      header: {
        'Encry': encryHeader,
      },
      formData:{  
        'sessionid':sessionid, 
        'imgid':templateId
     },  
    }).then((response) => {
      var response=JSON.parse(response);
      if (response.Success) {
        // var data = JSON.parse(data.Message);
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
  getUploadFile,
    getOpearImg
}