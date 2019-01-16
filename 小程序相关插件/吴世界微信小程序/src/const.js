//定义常量

//加载配置
const config = require('./config.js');
const domain = config.servsers //后台接口主机地址
//后台接口主机地址
exports.URL = {
  // 首页JOSN文件
  URL_GETINFO: `${domain}/interface/WeChatSessionId`,
  URL_GETLOGIN: `${domain}/interface/LoginVerifyCode`,
  URL_GETLISTBAGDE: `${domain}/interface/GetTemplateListBagde`,
  URL_GETTEMPLATE: `${domain}/interface/GetTemplate`,
  URL_OPEARIMG: `${domain}/interface/OpearImg`,
  URL_UPLOADIMG: `${domain}/interface/UploadImg`,
  URL_SENDMAIL: `${domain}/interface/SendMail`,
  
}
//基础参数
exports.TYPES = {
  codeKey: 'yangguangyinwang',
  imgRequest:false,
  loading_active:false,
}