'use strict';
global.tokens={};
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/userinfo', controller.user.userinfo);
  router.delete('/user/out', controller.user.out);
};
