const router = require('koa-router')()
const sql = require('../config/config')
const {getTimes} = require('../utils/utils')
router.get('/', async (ctx, next) => {
    await ctx.render('login.html');
})
router.get('/index', async (ctx, next) => {
	const goodsList= await sql.query("select * from goodsList").then(function(result) {
		return result;
	}, function(error){
		return -1;
	});
	var users={
		username:ctx.session.user,
		password:ctx.session.password
	}
    await ctx.render('index.html',{
		goodsList,users
	});
})

router.post('/login', async (ctx, next) => {
	const body = ctx.request.body;
	console.log(body);
	// http://static.98ep.com/Upload/ProductPic/600/
	const users= await sql.query("select * from users where username = ?;", [body.username]).then(function(result) {
	        return result;
	    }, function(error){
	        return -1;
		});
		console.log(users);
	if(body.username==users[0].username && body.password==users[0].password){
		ctx.session.user = body.username;
		ctx.session.password = body.password;
		ctx.response.redirect('/index');
		// await ctx.render('index.html', {
        //     users,goodsList
        // });
		// ctx.body={
		// 	code:0,
		// 	msg:'登录成功',
		// 	data: users,
		// 	// tk:token
		// }
	}else{
		ctx.body={
			code:1,
			msg:'账号或者密码错误',
		}
	}
	   //  var title='hello world';
  		// await ctx.render('login.html', {
    //         title
    //     })
})

router.get('/hello', async (ctx, next) => {
  		var tmp = await sql.query("select * from users where id > ?;", [1]).then(function(result) {
	        // console.log(result);
	        return result;
	    }, function(error){
	        return -1;
	    });
		if(tmp!=-1){
			tmp.forEach(function(list){
				list.created_at=getTimes(list.created_at);
			});
			await ctx.render('list.html', {
			    tmp
			})
		}
           // console.log(tmp);
           // ctx.body = tmp;
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
