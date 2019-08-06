var koa=require("koa");
var app=new koa();
// 配置路由

// 中间件express
// app.use(function(req,res){
//     res.send("返回数据");
// });

// 中间件koa
app.use((ctx=>{
    ctx.body="hello wasdorld";
}));
app.listen(3000)