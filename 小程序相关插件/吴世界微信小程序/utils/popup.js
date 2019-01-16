function examine(datas){
    if(datas.Message.indexOf("审核中")!=-1){
        wx.showToast({
            title: datas.Message,
            image: '../../images/error.png',
            duration: 2200
          });
        setTimeout(function () {
            wx.reLaunch({
                url: '../login/index'
            })
        },2000);
    }else{
        wx.showToast({
            title: datas.Message,
            image: '../../images/error.png',
            duration: 1200
        })
    }
}
function examine_fillUser(datas){
    if(datas.Message.indexOf("审核中"!=-1)){
        wx.showToast({
            title: datas.Message,
            image: '../../../images/error.png',
            duration: 2200
          });
        setTimeout(function () {
            wx.reLaunch({
                url: '../login/index'
            })
        },2000);
    }else{
        wx.showToast({
            title: datas.Message,
            image: '../../../images/error.png',
            duration: 1200
        })
    }
}
function error_normal(e){
    wx.showToast({
        title: e.Message,
        image: '../../images/error.png',
        duration: 1200
    })
}
function error_Text(e){
    wx.showToast({
        title: e,
        image: '../../images/error.png',
        duration: 1200
    })
}
function error_Text_fillUser(e){
    wx.showToast({
        title: e,
        image: '../../../images/error.png',
        duration: 1200
    })
}
function success(e){
    wx.showToast({
        title: '提交成功',
        duration: 1200
      })
}

export{
    examine,
    examine_fillUser,
    error_Text_fillUser,
    error_Text,
    error_normal,
    success
}
