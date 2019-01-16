// 'use strict';

// module.exports = appInfo => {
//   const config = exports = {};

//   // use for cookie sign key, should change to your own and keep security
//   config.keys = appInfo.name + '_1520669844558_7614';

//   // add your config here
//   config.middleware = [];

//   return config;
// };
// exports.security = {
//   domainWhiteList: [ 'http://localhost:3000' ],
//   csrf:false
// };
exports.security = {
  domainWhiteList: [ 'http://localhost:3000' ],
  csrf:false
};
exports.middleware = ['auth']

exports.keys = '_1516786677881_6052'

exports.mysql = {
client: {
  // host: '192.168.98.194',
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'ams',
  insecureAuth:true
},
//   client: {
//     host: 'bdm282742417.my3w.com',
//     port: '3306',
//     user: 'bdm282742417',
//     password: 'xinyu890458',
//     database: 'bdm282742417_db',
//     insecureAuth:true
//   },
};