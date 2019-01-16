const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
const HTMLWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const baseConfig = require("./webpack.base.js");
const config = require("./config.js");
const vendor = config.vendor;

module.exports = function(env){
	return webpackMerge(baseConfig(env),{
		entry:{
			main:path.resolve(__dirname,"../src/main.js"),
			vendor,
		},
		module:{
	        rules:[
				{
					test:/\.jsx?$/,
					use:["babel-loader"],
					exclude:"/node_modules/"
				},
				{ 
					test: /\.(png|jpg|gif)$/, 
					use: ["url-loader?limit=20000&name=images/[hash:16].[ext]"], 
					exclude: "/node_modules/" 
				},
				{ 
					test: /\.s?css$/, 
					use: ExtractTextPlugin.extract({
							fallback: "style-loader",
							use: [
								"css-loader?minimize&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
							    "sass-loader",
							    "postcss-loader"
							]
						 }),
					exclude: ["/node_modules/",path.resolve(__dirname,"../static")]
				},
				{ 
					test: /\.s?css$/, 
					use: ExtractTextPlugin.extract({
							fallback: "style-loader",
							use: [
								"css-loader?minimize",
							    "sass-loader",
							    "postcss-loader"
							]
						 }),
					include: [path.resolve(__dirname,"../static")]
				}
			],
		},
		plugins:[
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
				},
				output: {
					comments: false,
				},
			}),
			new ExtractTextPlugin({
				filename:"style.[contenthash:16].css",
				disable:false,
				allChunks:true,
			}),
			new HTMLWebpackPlugin({
				template:"src/index.html" 
			}),
			new webpack.optimize.CommonsChunkPlugin({
        		name: ["vendor","manifest"]
    		}),
    		new webpack.DefinePlugin({
				"process.env": { 
					NODE_ENV: JSON.stringify("production") 
				}
			}),
			new webpack.LoaderOptionsPlugin({
				options:{
					postcss(){
						return[precss, autoprefixer];
					},
					sassLoader: {
                        sourceMap: true
                    },
				}
			})
		]
	})
}