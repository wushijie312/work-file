var Koa=require("koa");
var router=require('koa-router')();//引入实例路由
//实例化
var app333=new Koa();
//1 cnpm i --save koa-views
//2 cnpm i --save ejs

router.get('/',async (ctx,next) =>{
    ctx.body="首页"; //返回数据，相当于res.send()

});

router.get('/news',async (ctx)=>{
    console.log("3这是匹配到的news路由");
    ctx.body="新闻页面";
});
//不论中间件在哪里都先执行中间件在执行路由
//执行到next后跳过下面中间件if，执行匹配路由后再执行if语句
app333.use(async (ctx, next)=>{
    console.log("1这是中间件01");
    next();
    console.log("5这是路由完成后返回来执行的中间件");
});
app333.use(async (ctx, next)=>{
    console.log("2这是中间件02");
    next();
    console.log("4这是路由完成后返回来执行的中间件");
});
app333.use(router.routes());//启动路由
app333.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app333.listen(3001,function() {
    console.log("localhost:3001");
})