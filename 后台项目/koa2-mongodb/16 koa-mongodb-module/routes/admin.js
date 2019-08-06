var router=require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body="这是首页"
});
router.get('/user',async (ctx)=>{
    ctx.body="用户管理"
});
router.get('/focus',async (ctx)=>{
    ctx.body="轮播图管理"
});
router.get('/news',async (ctx)=>{
    ctx.body="新闻管理"
});
module.exports=router;