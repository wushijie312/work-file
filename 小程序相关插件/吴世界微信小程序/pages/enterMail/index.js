//index.js
//获取应用实例
const app = getApp()
import {enterMail } from '../../service/enterMail.js'
import { TYPES } from '../../src/const.js'
import { examine,error_Text,success} from '../../utils/popup.js'
Page({
  data: {
    // loading_active:false,
    userEmail:'',
    emailHZ:''
  },
  inputEmailCodeTap:function(e){
    this.setData({
      userEmail:e.detail.value
    });
  },
  validateEmail:function(value) {
    var regex = /^\w+([-+.]\w+)*$/;
    return value.match(regex) == null;
  },
  Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
  },
  //事件处理函数
  enterMailTap: function () {
    var userEmail=this.Trim(this.data.userEmail);
    if(!this.validateEmail(userEmail) && userEmail){
      var emails=userEmail+this.data.emailHZ;
      enterMail(emails)
      .then(()=>{
        wx.navigateTo({
          url: `../mailVerify/index?emails=${emails}`
        });
        success("提交成功");
      })
      .catch(e => examine(e));
      
    }else{
      error_Text("请输入正确邮箱");
    }
  },
  onLoad: function () {
    this.setData({
      emailHZ:wx.getStorageSync('EmailSuffix')?wx.getStorageSync('EmailSuffix'):"@easypnp.com"
    });
  }
})
