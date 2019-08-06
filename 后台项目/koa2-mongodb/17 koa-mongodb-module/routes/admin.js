var router=require('koa-router')();
var user=require('./admin/user.js');
var focus=require('./admin/focus.js');
router.get('/',async (ctx)=>{
    ctx.body="这是首页"
});
router.use('/user',user);
router.use('/focus',focus);
module.exports=router;