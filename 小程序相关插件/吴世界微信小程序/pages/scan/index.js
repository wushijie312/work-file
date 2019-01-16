//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  GetUrlParam:function(url,paraName) {
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　　},
  //事件处理函数
  scanViewTap: function() {
    wx.scanCode({
        success: (res) => {
            
            // console.log("--result:" + res + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path)
          var codeNumber=this.GetUrlParam(res.path,"veridfyCode");
          // console.log(codeNumber +"————"+app.data.servsers + '/interface/LoginVerifyCode');
          var sessionid= wx.getStorageSync('SessionId');
          // var self=this;
          // md5加密
          var resValues= 'sessionid:'+sessionid+'&verifyCode:'+codeNumber+'&authoriType:1&key:'+app.data.codeKey;
          var encryptionValues=app.md5(resValues).toLowerCase();
          wx.request({
            url: app.data.servsers+'/interface/LoginVerifyCode', //仅为示例，并非真实的接口地址
            data:{
              sessionid:sessionid,
              verifyCode:codeNumber,
              authoriType:1
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Encry':encryptionValues
            },
            success: function(res) {
            
              if(res.data.Success==true){
                wx.setStorageSync('EmailSuffix',res.data.EmailSuffix);
                wx.navigateTo({
                  url: '../index/index'
                });
              }else{
                // console.log("sd");
                  app.isTrueAudit(res.data);
              }
            },
            fail:function(res){
              // self.setData({
              //   loading_active:false
              // });
              // console.log("sd");
              wx.showToast({
                title: res.data.Message,
                image: '../../images/error.png',
                duration: 1200
              })
            }
          })
          
        },
       fail: (res) => { 
        wx.showToast({  
          title: '失败请重新上传',  
          image: '../../images/error.png',
          duration: 2000  
        })  
      }    
    })
 
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene);
    console.log(scene);
  }
})
