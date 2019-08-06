var Koa=require("koa");
var router=require('koa-router')();//引入实例路由
//实例化
var app=new Koa();

//koa中间件写一个参数（函数）匹配所有路由，写两个参数匹配某个路由
app.use(async (ctx,next)=>{//匹配任意路由

    console.log(new Date());
    await next();
});
//配置路由
//ctx 上下文 context,包含了request,response等信息
router.get('/',async (ctx) =>{
    ctx.body="首页"; //返回数据，相当于res.send()
});
router.get('/news',async (ctx)=>{
    ctx.body="新闻页面";
});
//动态路由
router.get('/newscontent/:id',async (ctx)=>{
    //获取动态路由
    //url:     http://localhost:3001/newscontent/nn
    console.log(ctx.params);//{ id: 'nn' }

    ctx.body="新闻详情";
});
//动态路由可以传入多个值
router.get('/newscontent/:id/:aid',async (ctx)=>{
    //获取动态路由
    //url:     http://localhost:3001/newscontent/nn/999
    console.log(ctx.params);//{ id: 'nn', aid: '999' }

    ctx.body="新闻详情1";

});

app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3001,function() {
    console.log("localhost:3001");
})
