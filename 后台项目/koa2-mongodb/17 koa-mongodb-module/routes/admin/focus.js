var router=require('koa-router')();
//配置admin的轮播图子路由 层级路由
router.get('/',async (ctx)=>{
    // ctx.body="这是用户首页"
    await ctx.render('admin/focus/index');
});
router.get('/add',async (ctx)=>{
    await ctx.render('admin/focus/add');
});
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/focus/edit');
});
router.get('/delete',async (ctx)=>{
    ctx.body="删除轮播图"
});
module.exports=router.routes();