# Day01—项目的搭建

#### 1、项目目录结构的设计

所有的业务代码存放在src目录下

逻辑层—————page + view

数据层-----------service目录

工具层----------util目录

图片------------image目录

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6p3m8sccoj31i70u0dni.jpg)





#### 2、项目工具：npm和webpack以及git

.gitignore的配置：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6p3yk1ibnj30kw09ogln.jpg)

#### 3、npm/cnpm的初始化

先安装Nodejs，新版的Nodejs中自带了npm包管理器。

可以先安装cnpm，安装方法：

sudo npm install cnpm -g - -registry=https://registry.npm.taobao.org

在myProject目录下执行：cnpm init，会自动生成package.json文件

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6p48iumr3j31ho0so4a3.jpg)

然后我们可以继续安装webpack：

如果是安装单个的依赖包，则按照cnpm install xxx@v.v.v 的格式写。

然后会生成node_modules的文件夹，依赖包的源文件都会放在这个目录下。

卸载依赖包则使用：cnpm uninstall xxx@v.v.v

-g参数表示全局安装，如下：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6p4ezrhjgj319o0sqgpc.jpg)

#### 4、webpack的安装

类似于webpack的插件，比如：grant  glup

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6p4i3anw1j31ae0s2tcv.jpg)

先安装全局的webpack和webpack-cli

【注意】webpack-cli在webpack4.x之前是属于webpack的一部分，所以只需要全局安装webpack即可；但是在webpack4.x之后，webpack-cli被抽离出来了。所以webpack-cli也需要全局安装。当然，也都需要局部安装。全局安装的目的是使得

webpack可以当指令使用；局部安装的目的是使得可以对项目进行打包。

执行：sudo cnpm install webpack webpack-cli -g   即可

然后安装项目中的webpack，执行：

cnpm install webpack  webpack-cli - -save-dev

查看webpack的版本号：webpack -v

当安装完某个插件包以后，最好重新启动一次Gitbash。

比如：安装好nodejs的时候，如果不重启Gitbash，可能不能查到版本号。

====================================

#### 5、创建webpack.config.js文件

webpack的常见属性：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q5iazxsij316v0u00wq.jpg)



webpack的常用loader：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q5k1ah0yj31a40q4djs.jpg)

webpack的常用命令：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q5m8e3naj31aw0retbk.jpg)

webpack内置的服务器：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q5otragaj31hi0tkjxt.jpg)

#### 6、开始搭建项目

全局安装webpack：

执行：sudo cnpm install webpack -g

然后在项目中局部安装webpack：

执行：sudo cnpm install webpack —save-dev

效果如下：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q62olrxzj30sq09yjrw.jpg)

package.json文件：

{
  "name": "myproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.7"
  }
}

#### 7、创建index页面

创建index.js文件，代码如下：

var cats = require('./cats.js');

console.log(cats);

创建cats.js文件，内容如下：

var cats = ['dave', 'henry', 'martha];

module.exports = cats;

执行：webpack -d ./src/page/index/index.js  ./dist/main.js

#### 8、通过webpack.config.js文件的方式

创建webpack.config.js文件，代码如下：

var path = require('path');

module.exports = {
	entry: './src/page/index/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	}
}

执行：webpack -d + 回车(以不压缩的形式打包)

执行：webpack -p + 回车(以压缩的形式打包)

【注意】path路径必须是绝对路径，不能是相对路径

#### 9、webpack对脚本和样式的处理

webpack对脚本的处理：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q6nk4v3oj31h80sa799.jpg)

对样式的处理：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q6oy1x81j31c00lyaci.jpg)

改进如下：

var config = {

​	entry: './src/page/index/index.js',

​    output: {

​		path: './dist',

​		filename: 'app.js'

​	}

}

module.exports = config；

=====================================

#### 10、webpack中的js使用什么loader？

【答】webpack本身支持加载js

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q71pp6cij312c0ew41f.jpg)

执行：webpack + 回车

改进如下：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q73w9001j31620fqtbr.jpg)

#### 11、jQuery的引入

方案一：

npm install jquery - -save

index/index.js下引入jquery文件，如下：

var $ = require('jquery');

$('body').html("羊驼就是草泥马");

执行：webpack + 回车

删除jquery的方法：

cnpm uninstall jquery —save

如果删除失败，也可以在package.json中删除依赖的版本，然后删除node_modules，然后再执行sudo cnpm install将没有jquery的node_modules

s

方案二：

在view目录下创建index.html文件，引入打包好的js文件和jquey的CDN文件，

如下:    

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q7fq10a0j319c0g2q7a.jpg)

同时需要在webapack.config.js文件的config对象中配置：externals字段，如下：

externals: {

​	'jquery'  : 'window.jQuery'

}

继续执行：webpack + 回车

#### 12、webpack中如何提取公共的模块？

//splitChunks对象存放在optimization对象中
  optimization: {
    //抽取公共模块的对象
    splitChunks: {
      //缓存组
      cacheGroups: {
        //commons表示公共的模块
        commons: {
            //即会生成独立通用模块base.js文件(位置以output为准)
            name: "base",
            //chunks属性用来选择分割哪些代码块，可选值有：'all'（所有代码块），
            //'async'（按需加载的代码块），'initial'（初始化代码块）
            chunks: "initial",
            //最小2个文件有公共内容才提取
            minChunks: 2,
            //SplitChunksPlugin默认地只会分离大于30Kb的文件
            //我们的公共文件并没有大于30Kb，所以改为0之后就完美了
            minSize: 0
        }
      }
    }
  },

####13、webpack如何处理样式文件？

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6q8072nzwj314q066gmn.jpg)

其中的loaders改成rules

但是需要先安装：css-loader和style-loader

执行：cnpm install css-loader  style-loader  —save-dev

安装结果：

"css-loader": "^3.2.0",

"style-loader": "^1.0.0",

执行：webpack + 回车

但是这样的话，样式被打包进js文件中了。也就是说要等待js加载完毕的时候css才会生效，这样可能会有一个空白的样式的时间。这样用户体验不好。我们希望将css单独打包进css文件中，使用link的形式加载体验更好。

#### 14、CSS单独打包：extract-text-webpack-plugin

执行：cnpm install extract-text-webpack-plugin@next —save-dev

在webpack.config.js文件中导入：

var ExtractTextPlugin = require('extract-text-webpack-plugin');

在【plugins数组】中引入：

new ExtractTextPlugin("css/[name].css")

单独打包css的话需要对loader做一点改进，如下：

{ 
        test: /\\.css$/, 
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
  }

执行：webpack -d + 回车

===============================================

#### 15、webpack对html模板的处理

准备工作：

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6qv1d04vzj30nm08k75y.jpg)

如何把src中的html文件打包到dist目录中去？

【答】使用插件：html-webpack-plugin

安装方法，在项目目录下执行：cnpm install html-webpack-plugin --save-dev

在webpack.config.js中引入插件：

var HtmlWebpackPlugin = require('html-webpack-plugin');

在plugins对象中，如下：

new HtmlWebpackPlugin({
      template: './src/view/index.html',
      filename: 'view/index.html',
      inject: true,
      hash: true,
      chunks: ['common', 'index']
    })

然后执行：webpack + 回车

=================================

继续改进，抽成一个函数，如下：

var getHtmlConfig = function(name){
  return {
      template: './src/view/'+ name +'.html',
      filename: 'view/'+ name +'.html',
      inject: true,
      hash: true,
      chunks: ['common', name]
  }
}

使用的时候调用该函数，如下：

//html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))

然后写index.html页面和login.html页面。

====================================

#### 16、共享文件的引用方式

创建layout文件夹，创建html-head.html文件，文件内容：

<head>
	<meta charset="UTF-8">
	<title>我正在测试<%=语法 %></title>
</head>

执行：webpack  -d + 回车

发现报错，缺少loader。安装html-loader，如下：

cnpm install html-loader —save-dev

使用如下：

<!--【注意】HtmlWebpackPlugin插件支持Ejs语法的，如下-->
	<%= require('html-loader!./layout/html-head.html') %>

执行：webpack + 回车

===============================================

#### 17、webpack对icon-font和图片的处理

1）对图片的处理：

{ 
        test: /\\.(gif|png|jpg).??.*$/,
        loader: "url-loader?limit=100&name=resource/[name].[ext]"
}

先安装url-loader和file-loader，执行：

sudo cnpm install url-loader  file-loader - -save-dev

其中的limit=100是为了限制文件的大小，如果小于这个值的话，它就会把它打包成Base64的格式放在CSS文件里面；如果大于这个值的话，它会以文件的形式存在。【注意】图片不宜太大，超过244KB的图片会报警告。

参数name=resource/[name].[ext]是设置打包的路径和文件名。如果我们不加的话

它会默认以Hash值作为文件名。其中的[ext]是保留原文件的扩展名。

2）对字体的处理，补全如下：

{ 
        test: /\\.(gif|png|jpg|woff|svg|eot|ttf).??.*$/,
        loader: "url-loader?limit=100&name=resource/[name].[ext]"
}

======================================================

针对xxx不太认识的模块找不到的情况才使用下面的方法

重新安装所有的插件的步骤：

1、删除node_modules和package.json以及package-lock.json

2、执行cnpm init + 回车，重新生成package.json文件

3、执行cnpm install webpack@4.0.0  webpack-cli   -g

4、执行cnpm install webpack@4.0.0  webpack-cli   --save-dev

5、执行cnpm install  extract-text-webpack-plugin@next  --save-dev

6、执行cnpm install  html-webpack-plugin  --save-dev

7、执行cnpm install  css-loader   file-loader  html-loader   style-loader

url-loader  --save-dev

8、执行cnpm install webpack-dev-server  -g

9、执行cnpm install webpack-dev-server  --save-dev

ERROR + 红色

======================================================

#### 18、开发神器：webpack-dev-server

执行：sudo cnpm install webpack-dev-server - -save-dev

然后执行：webpack-dev-server + 回车的时候会报错，说没有这样的目录或文件

因为同样，如果需要将webpack-dev-server当做指令使用，也需要全局安装它。

执行：sudo cnpm install webpack-dev-server -g + 回车

启动，执行：webpack-dev-server + 回车

在浏览器中执行：http://localhost:8080/webpack-dev-server + 回车

webpack-dev-server在html中使用的是iframe的方式，这种方式的好处是

不用改配置文件，也不用添加其他的东西。但是不好的地方它的头部会有一个条，如下：

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6uczhcy1tj30jw01q746.jpg)

对于我们调试样式可能会造成冲突。而且它的iframe中的文件的变化并不会反应到真实的URL地址上，这在调试的时候是非常麻烦的。

解决办法：

先创建common文件夹，再创建index.js文件，在文件中随便写点内容。比如

'use strict';

console.log('I am global!');

我们在common中是打包进一个client，那么所有页面都可以使用

webpack-dev-server。所以我们将common写成数组的形式，如下：

//多入口单出口

 entry: {

​		'common': [
​       		 './src/page/common/index.js',
​       		 'webpack-dev-server/client?http://localhost:8088/'
​		],

执行：webpack-dev-server  - -inline - -port  8088 + 回车

然后访问浏览器：localhost:8088 + 回车

这样就没有那条黑色的头部了。

=============================================

【而且】只要我们修改了除webpack.config.js外的任何js或者html或者css文件

一旦保存，就会自动触发webpack的编译。同时需要先在output中写一个publicPath，如下:

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g6udff4nk6j30ma02oaa5.jpg)

这个publicPath表示我们访问文件时用的路径。

path表示我们存放文件的路径，即dist目录的路径。

这样，修改文件内容后，一旦保存就会触发页面的自动刷新。

这就是webpack-dev-server神奇的地方。

===============================================

#### 19、线上并不需要webpack-dev-server

先设置变量，如下：

//环境变量的配置   dev开发环境   online线上环境
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

再添加条件，如下：

if('dev' === WEBPACK_ENV){
  //设置的common是数组
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

Linux和Mac下启动方式，执行：

WEBPACK_ENV=dev  webpack-dev-server - -inline  - -port 8088 + 回车

Windows下启动方式，执行：

set WEBPACK_ENV=dev && webpack-dev-server --inline --port 8088

npm的脚本scripts脚本的用法：

"scripts": {
    "dev": "WEBPACK_ENV=dev webpack-dev-server --inline --port 8088",
    "dev_win": "set WEBPACK_ENV=dev && webpack-dev-server --inline --port 8088",
    "dist": "WEBPACK_ENV=online webpack -p",
    "dist_win": "set WEBPACK_ENV=online && webpack -p"
  },

然后执行：sudo  cnpm  run  dev  + 回车进行启动

执行：sudo  cnpm   run   dist + 回车进行打包







========================END=============================





