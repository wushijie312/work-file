import {getUploadFile } from '../../../service/fillUserInfo.js'
import { TYPES } from '../../../src/const.js'
import { error_normal,error_Text } from '../../../utils/popup.js'

import WeCropper from '../../we-cropper/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const app = getApp()
Page({
  data: {
    loading_active:false,
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    var self=this;
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        self.setData({ loading_active: true });
        getUploadFile(avatar)
        .then(data => {
          self.setData({
            loading_active: false
          })
          wx.redirectTo({
            url: `../index/index?avatar=${avatar}`
          });
        })
        .catch(e => {
          self.setData({
            loading_active: false
          });
          wx.showToast({
            title: e.Message,
            image: '../../../images/error.png',
            duration: 1200
          })
        });
      } else {
        // console.log('获取图片失败，请稍后重试')
        // error_Text("获取图片失败");
        wx.showToast({
          title: '获取图片失败',
          image: '../../../images/error.png',
          duration: 1200
        })
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src);
        var sessionid= wx.getStorageSync('SessionId');
        
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data

    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          // console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          // console.log(`before picture loaded, i can do something`)
          // console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          // console.log(`picture loaded`)
          // console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          // console.log(`before canvas draw,i can do something`)
          // console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
