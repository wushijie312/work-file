var path = require('path');
var webpack = require('webpack');//热更新
var htmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config={
    entry:path.resolve(__dirname, 'src/app.js'),
    // entry:[path.resolve(__dirname, './src/script/main1.js'),path.resolve(__dirname, './src/script/a.js')],
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'js/[name][hash].js',
        // publicPath:''
    },
    devtool:'eval-source-map' ,
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname, 'node_modules'),
                include:path.resolve(__dirname, 'src'),
                query:{
                    presets:['latest']
                }
            },
           {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
			        fallback: 'style-loader',
			        use: [
			            { 
                            loader: 'css-loader', 
			            },
			            'postcss-loader'
			        ]
			    }),
                // use: ExtractTextPlugin.extract(['style-loader','css-loader?importLoaders=1', 'postcss-loader'])
                // loader:'style-loader!css-loader!postcss-loader',
            }, {
                test:/\.less$/,
                loader:'style-loader!css-loader!less-loader',
               
              
            },{
                test:/\.html$/,
                loader:'html-loader',
            },{
				test:/\.(png|jpg|gif|svg)$/i,
                loader:'file-loader',
                query:{
                    name:'assets/[name]-[hash:5].[ext]'
                }
            }
            // ,{
			// 	test:/\.(png|jpg|gif|svg)$/i,
		    // 	loaders:[
		    // 	'url-loader?limit=6&name=assets/[name]-[hash:5].[ext]',
		    // 	'image-webpack-loader'],
		    // }

    ]
    },
    mode:'development',
    plugins:[
        new ExtractTextPlugin('static/css/[name].css'),
        new htmlWebpackPlugin({
            template:'index.html',
            filename:'index.html',
            title:'aaa',
            inject:'body',
            minify:{
				removeComments:true,
				collapseWhitespace:true
            }
        }),
        
    ]
    
}
module.exports=config;

const isDev=process.env.NODE_ENV==="development";
if(isDev){
    config.devtool ="＃廉价模块-EVAL-源映射"//代码映射
    config.devServer = {
     port:8000,//启动服务监听端口
     host:'0.0.0.0',//可以通过localhost访问
     overlay:{//在页面上显示错误信息
      errors:true,
      },
      open:true,//启动webpack-dev-server时自动打开浏览器
      hot:true //启用热更
    } 
    config.plugins.push(
     new webpack.DefinePlugin({}),//但是index.js里面是属于Webpack要构建的产物，如果里面也想读取环境变量。可以通过这个DefinePlugin定一下index.js里面就可以读到了。
     new webpack.HotModuleReplacementPlugin(),//在webpack工程中要实现热加载，就是只更新局部的修改
     new webpack.NoEmitOnErrorsPlugin()//热更相关插件
    )
   } 