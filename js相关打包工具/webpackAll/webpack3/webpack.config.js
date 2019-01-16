//context上下文的意思，根目录
var path = require('path');//hash chunkhash区别 hash是不变的，chunkhash是每次打包内容改变而随之改变
var htmlWebpackPlugin=require('html-webpack-plugin');//用途是事实打包index.html到dist中index中引用的js实时改变与其打包文件名一致
//htmlWebpackPlugin可以传参template：index.html指定到外层的index.html中
//removeComments 删除注释
//collapseWhitespace 除去空格
//chunks:引用只对自己有用的js
//excludeChunks:引用除什么之外的js
//inject:生成的js放在html什么位置
module.exports={
	entry:'./src/app.js',
	output:{
		path: path.resolve(__dirname, './dist'),
		filename:'js/[name].bundle.js'
	},
	module:{
		loaders:[{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:path.resolve(__dirname,'node_modules'),
		    	include:path.resolve(__dirname,'src')
			
			
		},{
				test:/\.html$/,
		    	loader:'html-loader',
		    	exclude:path.resolve(__dirname,'/node_modules'),
		    	include:path.resolve(__dirname,'src')
		    }]
		
	},
	plugins:[
		new htmlWebpackPlugin({
			template:'index.html',
			filename:'index.html',
			inject:'body',
			minify:{
				removeComments:true,
				collapseWhitespace:true
			}
		})
	]
}