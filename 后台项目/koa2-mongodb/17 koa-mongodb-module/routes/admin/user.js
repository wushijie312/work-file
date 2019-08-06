var router=require('koa-router')();
//配置admin的子路由 层级路由
router.get('/',async (ctx)=>{
    // ctx.body="这是用户首页"
    await ctx.render('admin/user/index');
});
router.get('/add',async (ctx)=>{
    await ctx.render('admin/user/add');
});
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/user/edit');
});
router.get('/delete',async (ctx)=>{
    ctx.body="删除用户"
});
module.exports=router.routes();