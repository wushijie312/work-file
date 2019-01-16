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