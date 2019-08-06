var router=require('koa-router')();//引入实例路由
const Koa = require('koa')
const render = require('koa-art-template');
const path = require('path')
const bodyparser=require('koa-bodyparser');
const DB=require("./module/db.js");
const app = new Koa()
app.use(bodyparser());
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
    var result=await DB.find('user');
    // var result=await DB.find('user',{username:'李四'});
    await ctx.render('index',{list:result});
})

router.get('/add', async ( ctx ) => {
    await ctx.render('add');
})
router.post('/doAdd', async ( ctx ) => {
    var data=await DB.insert('user',{username:ctx.request.body.name,age:ctx.request.body.age,sex:ctx.request.body.sex,status:'1'});//
    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return ;
        ctx.redirect('/add');
    }
})
router.get('/edit', async ( ctx ) => {
    let id=ctx.query.id;
    let data=await DB.find('user',{'_id':DB.getObjectId(id)});
    await ctx.render('edit',{list:data[0]});
})
router.post('/doEdit', async ( ctx ) => {
    var id=ctx.request.body.id;
    var username=ctx.request.body.name;
    var age=ctx.request.body.age;
    var sex=ctx.request.body.sex;
    var data=await DB.update('user',{'_id':DB.getObjectId(id)},{username,age,sex});//

    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return ;
        ctx.redirect('/add');
    }
})
router.get('/delete', async ( ctx ) => {
    // var result=await DB.remove('user',{username:'zhangsan'});
    // ctx.body=result;
    let id=ctx.query.id;
    var data=await DB.remove('user',{'_id':DB.getObjectId(id)});
    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return ;
        ctx.redirect('/add');
    }
})

app.use(router.routes());//启动路由
app.use(router.allowedMethods());//官方推荐用法，可以看到router.allowedMethods()用了路由匹配router.routes之后，所以在当所有路由中间件最后调用，此时滚据ctx.status设置response响应头
app.listen(3000,function() {
    console.log("localhost:3000");
})

