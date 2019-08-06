var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const render = require('koa-art-template');
const path = require('path')
const DB=require("./module/db.js");
const app = new Koa()
//1先打开mongodb
//执行app.js文件
//2 先执行localhost:3000
//3 在执行localhost:3000/news
//执行结果：第一次连接数据库比较慢，第二次及以后都比较快
//module/db.js 中
// this.connect();隐藏时
// start: 1068.656ms
// start: 7.713ms
// this.connect();打开时执行速度快了，因为实例化的时候就连接数据库了
// start: 27.037ms
// start: 10.033ms
app.use(async (ctx,next)=>{
    ctx.state.userinfo="张三"
    await next();
});
//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),//视图位置
    extname: '.html',//后缀名称
    // extname: '.art',//后缀名称
    debug: process.env.NODE_ENV !== 'production'//是否开启调试模式
});

router.get('/', async ( ctx ) => {
    //查询数据库user表 姓名为李四的数据
    console.time('start');
    var result=await DB.find('user',{username:'李四'});
    console.timeEnd('start');
    ctx.body=result;
})

router.get('/add', async ( ctx ) => {
    //查询数据库user表 姓名为李四的数据
    console.time('start');
    var result=await DB.insert('user',{username:'赵云',age:23,sex:'男',status:'1'});
    console.timeEnd('start');
    ctx.body=result;
})
router.get('/edit', async ( ctx ) => {
    //查询数据库user表 姓名为李四的数据
    var result=await DB.update('user',{username:'zhangsan',age:23},{username:'赵刚',age:34});
    console.log(result);


    ctx.body=result;
})
router.get('/delete', async ( ctx ) => {
    //查询数据库user表 姓名为李四的数据
    var result=await DB.remove('user',{username:'zhangsan'});
    console.log(result);


    ctx.body=result;
})

app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})

