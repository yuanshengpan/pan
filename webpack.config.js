//请求Nodejs提供的path模块
// path有一个方法：resolve(参数1，参数2)
// 参数1：__dirname表示当前目录的路径
// 参数2：需要追加的目录名，不需要写/，resolve方法会帮我们自动追加/
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 接口字符串
var str = new Buffer('aHR0cDovL3Rlc3QuaGFwcHltbWFsbC5jb20v', 'base64');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name, title){
	return {
		// 对哪个html文件进行打包
		template: './src/view/'+ name +'.html',
		// 打包以后的路径和文件
		filename: 'view/'+ name +'.html',
		title: title,
		// 自动注入
		inject: true,
		// 哈希值
		hash: true,
		// 有哪些打包后的js文件需要被注入到html文件中
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': './src/page/index/index.js',
		'list': './src/page/list/index.js',
		'detail': './src/page/detail/index.js',
		'cart': './src/page/cart/index.js',
		'order-confirm': './src/page/order-confirm/index.js',
		'order-detail': './src/page/order-detail/index.js',
		'order-list': './src/page/order-list/index.js',
		'payment': './src/page/payment/index.js',
		'user-login': './src/page/user-login/index.js',
		'user-register': './src/page/user-register/index.js',
		'user-result': './src/page/user-result/index.js',
		'user-center': './src/page/user-center/index.js',
		'user-center-update': './src/page/user-center-update/index.js',
		'user-pass-reset': './src/page/user-pass-reset/index.js',
		'user-pass-update': './src/page/user-pass-update/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	externals: {
		'jquery'  : 'window.jQuery'
	},
	//webpack4的新写法
	/*optimization: {
		// 抽取公共模块的对象
		splitChunks: {
			// 缓存组
			cacheGroups:{
				//commons表示公共的模块
				commons: {
					//即会生成独立通用模块base.js文件(位置以output为准)
					name: 'base',
					chunks: 'initial',
					//最小2个文件有公共内容才提取
					minChunks: 2,
					//SplitChunksPlugin默认地只会分离大于30Kb的文件
            		//我们的公共文件并没有大于30Kb，所以改为0之后就完美了
					minSize: 0
				}
			}
		}
	},*/
	module: {
		rules: [
			{
				test:/\.css$/, 
				// loader: "style-loader!css-loader",
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test:/\.(gif|png|jpg|jpeg|woff|svg|eot|ttf).??.*$/, 
				loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			},
			{
				test: /\.string$/,
				loader: "html-loader"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
		new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
		new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
		new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
		new HtmlWebpackPlugin(getHtmlConfig('payment', '订单确认')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-result', '操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息'))
	],
	resolve: {
		alias: {
			util : path.resolve(__dirname, 'src/util'),
			"@" : path.resolve(__dirname, 'src/page'),
			node_modules: path.resolve(__dirname, 'node_modules'),
			service: path.resolve(__dirname, 'src/service')
		}
	},
	devServer: {
		port: 8088,
		inline: true,
		// 配置代理实现跨域
		// 当访问localhost:8088/**/*.do的时候就跳转到
		//【网络接口】+ /**/*.do
		proxy: {
			"**/*.do": {
				target: str.toString(),
				changeOrigin: true
			}
		}
	}
}

//如果是开发环境，那么添加一个数组元素
if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;
