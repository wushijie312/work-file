var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
var bodyparser=require('koa-bodyparser');
var serve=require('koa-static');
const app = new Koa()
app.use(bodyparser());
app.use(serve('static'));

// koa 中koa-bodyparser中间件获取表单提交的数据
//     1 npm install --save koa-parser
//     2 引入
//     3 app.use(bodyParser());
//     4 ctx.request.body

// koa 中koa-static中间件获取表单提交的数据
//     1 npm install --save koa-static
//     2 引入
//     3 app.use(serve('.'));
//     4
//http://localhost:3000/static/css/index.css  首先去stati目录找，如果能找到返回对应的文件，找不到next()
//文件引入css的时候不用再加static例如：<link rel="stylesheet" href="css/index.css">即可
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))


router.get('/', async ( ctx ) => {
    await ctx.render('index');
})
router.post('/doAdd', async ( ctx ) => {
    //获取表单提交的数据
   ctx.body=ctx.request.body

})
app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:30060");
})