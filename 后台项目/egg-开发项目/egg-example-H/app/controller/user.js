'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

 

  async login() {
    const { app, ctx } = this;
    const body = ctx.request.body;
    const user = await app.mysql.get('users', { username:  body.username});
    console.log(user);
    if (body.username === user.username && body.password === user.password){
      let token = Date.now();
      tokens[user.id] = token;
      console.log(token);
      this.ctx.body = {
        code: 0,
        msg: '登录成功',
        data: token
      };
    }else {
      this.ctx.body = {
      code: 1,
      msg: '账号或密码错误',
    };
  }
  }

  async userinfo() {
      this.ctx.body = {
        code: 0,
        msg: 'xxxxxxx'
      };
  }

  async out() {
    let { token ,uid} = this.ctx.header;
    delete tokens[uid];
    this.ctx.body = {
      code: 0,
      msg: '推出成功'
    };
  }

}

module.exports = HomeController;
