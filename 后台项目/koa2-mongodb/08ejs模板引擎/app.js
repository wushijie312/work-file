var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
//1 cnpm i --save koa-views
//2 cnpm i --save ejs
//3 const views = require('koa-views')
// app.use(views(__dirname,{extension: 'ejs'}))
//4 await ctx.render('index')

// 注意  我们需要在每一个路由的render里面都要渲染一个公共的数据
//公共的数据放在这个里面，这样的话在模板的任何地方都可以使用
//    ctx.state={   //放在中间件里
//       session:'832498584',
//        title:'app'
//    }

//   写一个中间件配置公共信息
app.use(async (ctx,next)=>{
    ctx.state.userinfo="张三"
    await next();
});



// 配置模板引擎中间件 ---第三方中间件
//方式一
// app.use(views('views',{map:{html:'ejs'}}));//和下面效果一样只是views文件中的文件名后缀以.html结尾
//方式二
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// app.use('/', async ( ctx ) => {
//     let title = 'hello koa2'
//     await ctx.render('index', {
//         title
//     })
// })

router.get('/', async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index',{title});
})
router.get('/news',async (ctx)=>{
   let arr=['111','222','4343'];
   let content="<h3>wushijie</h3>"
    const age=24
   await ctx.render('news',{list:arr,content,age});
});
app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})