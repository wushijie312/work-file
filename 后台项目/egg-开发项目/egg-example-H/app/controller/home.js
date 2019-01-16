'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = 'hi, egg！';
  }

  async test() {
    const { app, ctx } = this;
    const query = ctx.request.query;
    let users = await app.mysql.select('users');
    console.log(users);
    if (query.name === 'root' && query.password === 'root')
      this.ctx.body = {
        code: 0,
        msg: '登录成功',
        data: "djklfjdlkfldjfkld"
      };
    else 
      this.ctx.body = {
      code: 1,
      msg: '账号或密码错误',
    };
  }

}

module.exports = HomeController;
