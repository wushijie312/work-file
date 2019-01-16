//index.js
//获取应用实例
const app = getApp()
import {getTemplate,getListBagde } from '../../service/index.js'
import { TYPES } from '../../src/const.js'
import { examine } from '../../utils/popup.js'
Page({
  data: {
    loading_active:false,
    currentActive:0,
    templateList:[],
    templateId:0,
    onloadonetime:true
  },
  //事件处理函数
  indexTap: function() {
    this.setData({loading_active:true});
    getTemplate(this.data.templateId)
     .then((data)=>{
      this.setData({ loading_active: false });
      wx.setStorageSync('template',data.template);
      wx.navigateTo({
        url: '../fillUserInfo/index/index'
      });
    })
    .catch(e =>  examine(e));
  },
  changeMoban:function(e) {
    let { current, listid } = e.currentTarget.dataset;
    this.setData({
      currentActive: current,
      templateId: listid
    });
  },
  onLoad: function () {
    this.setData({ loading_active: true });
    getListBagde()
    .then(data => {
      this.setData({
        loading_active: false,
        templateList: data.templateList,
        templateId: data.templateId
      })
    })
    .catch(e => examine(e));
  }
})
