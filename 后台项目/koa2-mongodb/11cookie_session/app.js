var router=require('koa-router')();//引入实例路由
const Koa = require('koa');
const session = require('koa-session');
const render = require('koa-art-template');

//1 npm install koa-session
//2 const session=require('koa-session);
//3 const app = new Koa();
//
// app.keys = ['some secret hurr'];/**cookie的签名 */
//
// const CONFIG = {
//   key: 'koa:sess', /**默认不用管 */
//   maxAge: 86400000, //过期时间 [需要修改]
//   autoCommit: true, /** (boolean) automatically commit headers (default true) */
//   overwrite: true, /** 默认 */
//   httpOnly: true, /** true只有服务器端才能获取cookie */
//   signed: true, /** 默认 签名 */
//   rolling: false, /** 每次访问都会更新session(默认false) */
//   renew: false, /** 快过期的时候重新设置 [需要修改]*/
// };
//
// app.use(session(CONFIG, app));
//4 使用
//  ctx.session.username="张三";
//5 获取
const path = require('path');
const app = new Koa();
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),//视图位置
    extname: '.html',//后缀名称
    // extname: '.art',//后缀名称
    debug: process.env.NODE_ENV !== 'production'//是否开启调试模式
});

router.get('/', async ( ctx ) => {
    let list={name:'首页'};
    console.log(ctx.session.userinfo);
    ctx.body=ctx.session.userinfo;
})
router.get('/login',async (ctx)=>{
    let list={name:'登录成功'};
    ctx.session.userinfo="张三";
    // userinfo
    await ctx.render('login',{list});
 });
app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})