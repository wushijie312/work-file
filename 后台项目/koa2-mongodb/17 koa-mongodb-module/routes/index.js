var router=require('koa-router')();

router.get('/',async (ctx)=>{
    // ctx.body='这是首页';
    await ctx.render('default/index');
});
//注意 前后台匹配路由的写法不一样
router.get('case',async (ctx)=>{
    ctx.body='案例'
});
router.get('about',async (ctx)=>{
    // ctx.body="关于我们"
    await ctx.render('default/about');
});

module.exports=router.routes();