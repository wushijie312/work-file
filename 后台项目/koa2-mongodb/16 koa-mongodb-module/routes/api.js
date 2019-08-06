var router=require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body='这是api接口';
});
router.get('/newslist',async (ctx)=>{
    ctx.body={"title":"这是news首页"}
});
router.get('/focus',async (ctx)=>{
    ctx.body="轮播图"
});

module.exports=router.routes();