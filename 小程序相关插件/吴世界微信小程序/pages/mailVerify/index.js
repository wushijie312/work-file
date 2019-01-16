//index.js
//获取应用实例
const app = getApp()
import {enterMail } from '../../service/enterMail.js'
import { TYPES } from '../../src/const.js'
import { examine,success} from '../../utils/popup.js'
Page({
  data: {
    loading_active:false,
    emails:''
  },
  backInputAgainTap:function(){
    wx.navigateBack();
  },
  //事件处理函数
  mailVerifyTap: function() {
    wx.reLaunch({
      url: '../login/index'
    })
  },
  mailVerifySendTap:function(){
    enterMail(this.data.emails)
    .then(data=>success("提交成功"))
    .catch(e => examine(e));
    
  },
  onLoad (option) {
    let { emails } = option
    if (emails) {
      this.setData({
        emails: emails
      })
    }
  }
})
