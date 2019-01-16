//index.js
//获取应用实例
import {getTemplate } from '../../service/login.js'
import { error_normal,error_Text } from '../../utils/popup.js'
import { TYPES } from '../../src/const.js'
const app = getApp();
Page({
  data: {
    loading_active:false,
    verifyCode:''
    // EmailSuffix:''
  },
  //事件处理函数
  inputVerifyCodeTap:function(e){
    this.setData({
      verifyCode:e.detail.value
    });
  },
  signInTap: function() {
    var verifyCode=this.data.verifyCode;
    if(verifyCode!=''){
      getTemplate(verifyCode)
      .then(data=>{
        this.setData({
          EmailSuffix:data.EmailSuffix
        })
        wx.navigateTo({
          url: '../index/index'
        });
      }).catch(e=>{error_normal(e)});
    }else{
      error_Text("请输入授权码");
    }
  }
})
