
//初始化配置文件

//主配置
const mainConf = require('../config/main.js');

//品牌号配置
const brandConf = require('../config/brand.js');
let brand = brandConf.brand;

//品牌相关配置
const extConfigFile =  `../config/main.${( brand || '').toLowerCase() }.js`;

//ETO系统配置
const etoConfig = {
  etoBrand: mainConf.ETO_BRAND[brand],
}

var extConfig = null;
try{
  extConfig = require(extConfigFile);
}catch(e){
  console.error(`不存在的扩展配置:(${extConfigFile})!`);
}

//三个配置信息合并导出
module.exports = Object.assign(
  mainConf, //主配置
  brandConf, //品牌号配置
  extConfig, //品牌相关配置
  etoConfig, //ETO系统配置
);