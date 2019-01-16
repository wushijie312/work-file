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
	var users=ctx.session.user;
	// console.log(users);
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
		// console.log(users);
	if(body.username==users[0].username && body.password==users[0].password){
		ctx.session.user =users[0] ;
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

router.post('/register', async (ctx, next) => {  
	const body = ctx.request.body;
	// http://static.98ep.com/Upload/ProductPic/600/
	
	  const users= await sql.query("select * from users where username = ?;", [body.username]).then(function(result) {
			  return result;
		  }, function(error){
			  return 0;
	  });
	  if(!users.length){
		var insertSql="insert into users (username,email,phone,password) values (?,'','',?)";
		const users= await sql.query(insertSql,[body.username,body.password]);
		  ctx.response.redirect('/login');
	  }else{
		ctx.body={
				code:1,
				msg:'用户名重复',
				data: users,
				// tk:token
			}
	  }  
  }) 
  router.get('/sssss/:id', async (ctx, next) => {  
	function getTypeId(str){
		var index = str.lastIndexOf("\/");  
		str  = str .substring(index + 1, str .length);
		return str;
	}
	var usersId=getTypeId(ctx.url);
	// http://static.98ep.com/Upload/ProductPic/600/
	
	  var users= await sql.query("select * from users where id = ?;", [usersId]).then(function(result) {
			  return result;
		  }, function(error){
			  return 0;
	  });
	 users=users[0];
	  if(users){
		await ctx.render('sssss.html',{
			users
		});
	  }else{
		ctx.body={
				code:1,
				msg:'修改不存在',
				// tk:token
			}
	  }  
  }) 
  router.post('/sssss/:id', async (ctx, next) => {  
	const body = ctx.request.body;
	function getTypeId(str){
		var index = str.lastIndexOf("\/");  
		str  = str .substring(index + 1, str .length);
		return str;
	}
	var usersId=getTypeId(ctx.url);
	// http://static.98ep.com/Upload/ProductPic/600/
	  
		var insertSql="update users set username = ?,password = ? where id=?";
		// console.log(users.id);
		await sql.query(insertSql,[body.username,body.password,usersId]);
		// console.log(users);
		  ctx.response.redirect('/login');
	  
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
