const router = require('koa-router')()
const sql = require('../config/config')
const path = require('path')
const { uploadFile } = require('../utils/upload')
// const multer = require('koa-multer');
// var koaBody = require('koa-body')({ multipart: true });
// var bodyParse =require('koa-better-body')({ multipart: true })
//文件上传  
//配置  
// var storage = multer.diskStorage({  
//   //文件保存路径  
//   destination: function (req, file, cb) {  
//     cb(null, 'public/uploads/')  
//   },  
//   //修改文件名称  
//   filename: function (req, file, cb) {  
//     var fileFormat = (file.originalname).split(".");  
//     cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
//   }  
// })  
//加载配置  
// var upload = multer({ storage: storage });  
// upload.single('file')


//路由 
router.get('/login', async (ctx, next) => {  
		await ctx.render('login.html');
})  
router.post('/uploads/:id', async (ctx, next) => {  
  // const files=upload.single('file')();
   // 上传文件请求处理
   function getTypeId(str){
		var index = str.lastIndexOf("\/");  
		str  = str .substring(index + 1, str .length);
		return str;
	}
  var usersId=getTypeId(ctx.url);
   let result = { success: false }
   let serverFilePath = ('public/uploads' )

   // 上传文件事件
   result = await uploadFile( ctx, {
     fileType: 'album',
     path: serverFilePath
   })
   var images= getTypeId(result.data.pictureUrl);

  const body = ctx.request.body;
  var insertSql="update users set images = ? where id=?";
		// console.log(users.id);
		await sql.query(insertSql,[images,usersId]);
		// console.log(users);
		ctx.response.redirect('/login');

	
}) 



module.exports = router;
