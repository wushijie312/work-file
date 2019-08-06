var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const render = require('koa-art-template');
const path = require('path')
const app = new Koa()

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
    let title = 'hello art-template'
    await ctx.render('index',{title});
})
router.get('/news',async (ctx)=>{
   let arr=['kkkk',{kkk:'34234'}];
   let content="<h3>wushijie</h3>"
    const age=24
   await ctx.render('news',{list:arr,content,age});
});
app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})