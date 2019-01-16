//index.js
//获取应用实例
import {getOpearImg } from '../../../service/fillUserInfo.js'
import { TYPES } from '../../../src/const.js'
import { examine_fillUser,error_Text_fillUser } from '../../../utils/popup.js'
const app = getApp()

Page({
  data: {
    loading_active:false,
    src: '',
    username:'',
    userClass:''
  },
  //事件处理函数
  inputUsernameTap:function(e){
    this.setData({username:e.detail.value});
    wx.setStorageSync('username',e.detail.value);
  },
  Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
  },
  //事件处理函数
  inputUserCLassTap:function(e){
    this.setData({
      userClass:e.detail.value
    });
    wx.setStorageSync('userClass',e.detail.value);
  },
  uploadImgTap () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  //事件处理函数
  fillUserTap: function() {
    if(this.data.src==''){
      error_Text_fillUser("请上传头像");
      return;
    }
    if(this.data.username==''){
      error_Text_fillUser("请输入姓名");
      return;
    }
    if(this.data.userClass==''){
      error_Text_fillUser("请输入部门");
      return;
    }
    if(this.Trim(this.data.username).length>9){
      error_Text_fillUser("姓名不超9个字");
      return;
    }
    if(this.Trim(this.data.userClass).length>9){
      error_Text_fillUser("部门不超9个字");
      return;
    }
    this.setData({loading_active:true});
    getOpearImg(this.data.username,this.data.userClass).then(data=>{
      this.setData({loading_active:false});
      wx.navigateTo({
        url: `../../preview/index?srcs=${data.srcs}`
      });
    })
    .catch(e => {
      this.setData({
        loading_active: false
      });
      examine_fillUser(e);
    });
      
  },
  onLoad (option) {
    let { avatar } = option
    this.setData({
      username: wx.getStorageSync('username'),
      userClass: wx.getStorageSync('userClass')
    });
    if (avatar) {
      this.setData({
        src: avatar
      })
    }
  }
})
