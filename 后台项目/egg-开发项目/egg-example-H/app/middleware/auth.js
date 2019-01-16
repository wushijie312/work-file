//忽略权限校验
let IGNORE = [
  '/user/login'
]

//Token 校验
module.exports = () => {

    return async function auth(ctx, next) {

      let path = ctx.path;
      if(!IGNORE.includes(path)){
        let { token ,uid} = ctx.header;
        if(token && tokens[uid] == token){
          console.log(`鉴权通过: ${uid}`);    
        }else{
          ctx.body = {code: -1,msg: '登录失效'};
          return;
        }
      }
      await next();
    }

};