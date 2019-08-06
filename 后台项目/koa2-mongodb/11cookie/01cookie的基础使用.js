var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const render = require('koa-art-template');
const path = require('path')
const app = new Koa()
// 1 保存用户信息在浏览器客户端
// 2 可以让我们用同一个浏览器访问同一个域名的时候共享数据

//1 保存用户信息
//2 浏览历史记录
//3 猜你喜欢的功能
//4 10天免登陆
//5 多个页面之间的数据传递
//6 cookie实现购物车功能

//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),//视图位置
    extname: '.html',//后缀名称
    // extname: '.art',//后缀名称
    debug: process.env.NODE_ENV !== 'production'//是否开启调试模式
});

router.get('/', async ( ctx ) => {
    let list={name:'张三'};
    ctx.cookies.set('userinfo','zhangsan',{
        maxAge:1000*20,//设置过期时间
        // expires:'2019-12-06',//设置过期具体时间
        // path:'/news',//设置cookie在路径为news时生效
        // domain:'*.baidu.com',//正常不用设置 默认就是当前域下面的所有页面都可以访问
            //a.baidu.com
            //b.baidu.com  共享cookie数据 即二级域名共享如果访问baidu.com访问不了这是顶级域名
            //
        httpOnly:false,  //true表示这个cookie只是服务器端可以访问,false表示客户端(js),服务器端都可以访问
    });
    await ctx.render('index',{list});
})
router.get('/news',async (ctx)=>{
    let list={name:'张三'};
    var userinfo=ctx.cookies.get("userinfo");
 console.log(userinfo);
    await ctx.render('news',{list,userinfo});
 });
 router.get('/shop',async (ctx)=>{
    let list={name:'张三'};
    var userinfo=ctx.cookies.get("userinfo");
 console.log(userinfo);
    await ctx.render('news',{list,userinfo});
 });
app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})