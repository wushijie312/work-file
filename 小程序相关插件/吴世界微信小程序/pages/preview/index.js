//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loading_active:false,
   previews:''
  },
  //事件处理函数
  previewTap: function() {
    wx.navigateTo({
      url: '../enterMail/index'
    })
  },
  againeditTap:function(){
    wx.navigateBack();
  },
  onLoad (option) {
    let { srcs } = option;
    if (srcs) {
     
      this.setData({
        previews: srcs
      })
    }
  }
})
