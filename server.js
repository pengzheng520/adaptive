/**
 * Created by zhengpeng on 2016/11/4.
 */
const Webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require("./webpack.config");

var compiler = Webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    publicPath: '/',
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    },
    proxy: { //代理服务器
        '/contract-type-backend/*': {
            target: 'http://192.168.130.154:8080/',
            changeOrigin: true
        }
    }
});

server.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log('http://localhost:3000')
});