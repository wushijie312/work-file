//app.js
import { wxInfo } from './service/getInfo.js';
const config = require('src/config.js');
// import {error_normal } from './utils/popup.js';
App({
  data:{   
  },
  onLaunch: function () { 
    //配置信息挂载再App中
    this.config = config; 
    wxInfo();
  }
})