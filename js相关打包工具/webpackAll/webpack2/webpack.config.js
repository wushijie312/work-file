//context上下文的意思，根目录
var path = require('path');//hash chunkhash区别 hash是不变的，chunkhash是每次打包内容改变而随之改变
var htmlWebpackPlugin=require('html-webpack-plugin');//用途是事实打包index.html到dist中index中引用的js实时改变与其打包文件名一致
//htmlWebpackPlugin可以传参template：index.html指定到外层的index.html中
//removeComments 删除注释
//collapseWhitespace 除去空格
//chunks:引用只对自己有用的js
//excludeChunks:引用除什么之外的js
//inject:生成的js放在html什么位置
// publicPath:'www.baidu.com' 上线时候写的地址
module.exports={
	// context:'',//上下文的意思，根目录
	entry:{
		main:'./src/script/main.js',
		a:'./src/script/a.js',
		b:'./src/script/b.js',
		c:'./src/script/c.js',
		maina:'./src/script/maina.js'
	},
	output:{
		path: path.resolve(__dirname, './dist'),
		filename:'js/[name].[hash].js'
		// publicPath:'https://dec/'// 指的是上线时js前面路径
	},
	plugins:[
		new htmlWebpackPlugin({
			template:'index.html',//指向文件的根目录
			filename:'index-[hash].html',
			inject:'body',
			minify:{
				removeComments:true,
				collapseWhitespace:true
			}
		}),
		new htmlWebpackPlugin({
			template:'index.html',
			filename:'a.html',
			title:'a.html',
			excludeChunks:['a','c'],
			inject:'body',
			minify:{
				removeComments:true,
				collapseWhitespace:true
			}
		}),
		new htmlWebpackPlugin({
			template:'index.html',
			filename:'b.html',
			title:'b.html',
			chunks:["main",'maina','a','c'],
			inject:'body',
			minify:{
				removeComments:true,
				collapseWhitespace:true
			}
		}),
		new htmlWebpackPlugin({
			template:'index.html',//为什么会指向根目录呢？因为context:'',//上下文的意思，根目录
			filename:'c.html',
			title:'c.html',
			chunks:["main",'c'],
			inject:'body',
			minify:{
				removeComments:true,
				collapseWhitespace:true
			}
		})
	]
}