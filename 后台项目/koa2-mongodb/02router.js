var Koa=require("koa");
var router=require('koa-router')();//引入实例路由
//实例化
var app=new Koa();


//配置路由
//ctx 上下文 context,包含了request,response等信息
router.get('/',async (ctx) =>{
    ctx.body="首页"; //返回数据，相当于res.send()
});
router.get('/news',async (ctx)=>{
    ctx.body="新闻页面";
});
router.get('/newscontent',async (ctx)=>{
    ctx.body="新闻详情";
});

app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3001,function() {
    console.log("localhost:3001");
})