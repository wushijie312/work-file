var path = require('path');//hash chunkhash区别 hash是不变的，chunkhash是每次打包内容改变而随之改变
module.exports={
	entry:{
		main:'./src/script/main.js',
		maina:'./src/script/maina.js'
	},
	output:{
		path: path.resolve(__dirname, './dist/js'),
        publicPath: '/js/',
		filename:'[name].[chunkhash].js'
	}
}