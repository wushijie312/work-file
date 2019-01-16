(node:4728) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:4728) DeprecationWarning: Tapable.apply is deprecated. Call apply on the plugin directly instead
报错原因可能是版本号不对试试：cnpm install extract-text-webpack-plugin@next

//var path = require('path');//hash chunkhash区别 
//hash是不变的，chunkhash是每次打包内容改变而随之改变
//var htmlWebpackPlugin=require('html-webpack-plugin'); 生成html文件
// loader 是处理资源文件的，然后再返回一个资源文件
// loader query 参数处理presets转换es6语法特性使运行不报错
// require('style-loader!css-loader!./style.css'); 使css不报错
//module include 指定打包范围
//postcss-loader 后处理css文件加前缀
//importLoaders   ?importLoaders=1!postcss-loader 用于处理@import './index.css'; 中是否有css属性兼容问题，有则加上兼容类型，importLoaders=1 1代表后边有几个loader
//autoprefixer postcss-import 配合postcss使用
//cssnext  插件允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性。cssnext 负责把这些新特性转译成当前浏览器中可以使用的语法
//style-loader  把css放进index文件中
//css-loader   把整理并生成css
//file-loader 处理图片文件 没有参数limit
//html-loader   处理html
//less-loader   处理less文件
//ejs-loader   处理ejs文件
//sass-loader   处理sass文件
//url-loader   处理文件 图片 有参数limit 限制图片大小，在范围内打包成base64位，超出正常http请求
//img-webpack-loader 压缩图片
// 
//new webpack.ProvidePlugin({
//     $: "jquery",
//     jQuery: "jquery",
//     "window.jQuery": "jquery"
// }))  当模块使用这些变量的时候,wepback会自动加载。（区别于window挂载)
// new webpack.NoErrorsPlugin(),  不显示错误插件
// new webpack.optimize.DedupePlugin(),  查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
// new webpack.optimize.UglifyJsPlugin(),  丑化js 混淆代码而用
// new webpack.optimize.CommonsChunkPlugin('common.js')  提取公共代码的插件--config 指定配置打包文件到webpack.dev.config.js --progress显示打包进度过程 --display-modules显示打包模块 --colors显示打包颜色 --display-reasons 显示打包原因"
// 
// 
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "web": "webpack --watch --config webpack.config.js --progress --display-modules --colors --display-reasons",
//   "webcopy": "webpack --watch --config webpack.dev.config.js --progress --display-modules --colors --display-reasons"
// },
// --config 指定配置打包文件到webpack.dev.config.js --progress显示打包进度过程 --display-modules显示打包模块 --colors显示打包颜色 --display-reasons显示打包原因"
// 
// //context上下文的意思，根目录
//hash chunkhash区别 hash是不变的，chunkhash是每次打包内容改变而随之改变
// var htmlWebpackPlugin=require('html-webpack-plugin');//用途是事实打包index.html到dist中index中引用的js实时改变与其打包文件名一致
//htmlWebpackPlugin可以传参template：index.html指定到外层的index.html中
<!-- 
plugins:[
		new htmlWebpackPlugin({
			filename:'index.html',//重新命名成index.html
			inject:'body',//指定脚本放在html什么位置，这里设置到body里了
			title:'a.html',//生成html的标题内容配置在根目录下index.html
			                    //<title><%=htmlWebpackPlugin.options.title%></title>
			chunks:['main','maina','b','c'],//chunks:引用只对自己有用的js
			minify:{
				removeComments:true,//removeComments 删除注释
				collapseWhitespace:true//collapseWhitespace 除去空格
			},

			template:'index.html'//如果不写template：‘index.html’,根目录下的index.html不会打包到dist中index里只打包生成的js、css放进index.html里，
		})
	] 


	-->
//removeComments 删除注释
//collapseWhitespace 除去空格
//chunks:引用只对自己有用的js
//excludeChunks:引用除什么之外的js
//inject:生成的js放在html什么位置
//image-webpack-loader 压缩图片
//
//{
//  test:/\.(png|jpg|gif|svg)$/i,//匹配内容
//  loader:'url-loader',
//  exclude:path.resolve(__dirname,'/node_modules'),//不打包文件范围路径
//  include:path.resolve(__dirname,'src'),//打包文件范围路径
//  query:{
//      limit:200000,
//      name:'assets/[name]-[hash:5].[ext]'
//  }
// }
// 
// publicPath:'http://cdn.com/',//把引用js路径"js/app.da275f6d82286b2944f3.bundle.js"换成"http://cdn.com/js/app.92ff589867939a27c43c.bundle.js"






### package.json配置
#### 没有webpack.config.js时package.json文件
"scripts": {
    "dev": "webpack --mode development  --watch --progress --display-modules --display-reasons",
    "build": "webpack --mode production"
  },



###生成多个html文件写法
module.exports={
	// entry:'./src/index.js',
	// entry:['./src/index.js','./src/index1.js'],
	entry:{
			app:'./src/a.js',
			search:'./src/index.js'
			
			},
	output:{
		path:path.resolve(__dirname, './dist'),
		filename:'js/[name].[hash].bundle.js',
		//publicPath:'http://cdn.com/'
	},
	mode:'development',
	plugins:[
		new htmlWebpackPlugin({
			filename:'a.html',
			inject:'body',
			title:'a.html',
			chunks:['app','search'],
			minify:{
				removeComments:true,
				collapseWhitespace:true
			},
			template:'index.html'
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			inject:'body',
			title:'b.html',
			chunks:['app'],
			minify:{
				removeComments:true,
				collapseWhitespace:true
			},
			template:'index.html'
		}),
	]
}

###完整的打包 并且css单独打包 基础版
var htmlWebpackPlugin=require('html-webpack-plugin');
// var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
module.exports={
	// entry:'./src/index.js',
	// entry:['./src/index.js','./src/index1.js'],
	entry:{
			app:'./src/a.js',
			search:'./src/index.js'
			
			},
	output:{
		path:path.resolve(__dirname, './dist'),
		filename:'js/[name].[hash].bundle.js',
		// publicPath:'http://cdn.com/',
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				include:path.resolve(__dirname, './src'),
				use:{
					loader:'babel-loader',
					options:{
						presets:["env"]
					}
				}
			},
			{
		        test: /\.css$/,
		        exclude:/node_modules/,
		        include:path.resolve(__dirname, './src'),
		        use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
						   
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                   
                                    require('postcss-import')(),
                                    require('autoprefixer')({
                                        browsers: ['last 15 versions']
                                    }),
                                    require('postcss-cssnext')(),
                                    
                                    require('cssnano')()

                                ]
                            }
                        }
                    ]
                })
		      }
		]
	},
	// mode:'development',
	plugins:[
		new htmlWebpackPlugin({
			filename:'a.html',
			inject:'body',
			title:'a.html',
			chunks:['app','search'],
			minify:{
				removeComments:true,
				collapseWhitespace:true
			},
			template:'index.html'
		}),
		new htmlWebpackPlugin({
			filename:'b.html',
			inject:'body',
			title:'b.html',
			chunks:['app'],
			minify:{
				removeComments:true,
				collapseWhitespace:true
			},
			template:'index.html'
		}),
		new ExtractTextPlugin({
			filename:"styles.css",
		}),
		 // 构建优化插件
	   // new webpack.optimize.CommonsChunkPlugin({
	   //      name: 'vendor',
	   //      filename: 'vendor-[hash].min.js',
	   // }),
	]
}