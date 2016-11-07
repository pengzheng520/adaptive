/**
 * Created by shenchangmin on 2016/10/14.
 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextWebpackPlugin('[name].[hash].css');
const util = require('./webpack.util');
const files = ['demo', 'swiper'];
let entry = {};
let views = [];


for (let i = 0; i < files.length; i++) {
    let arrO = [files[i]];
    arrO.push('vendor');

    views.push(new HtmlWebpackPlugin({
        template: './src/pages/' + files[i] + '.html',
        filename: files[i] + '.html',
        /**
         * 给生成HTML上添加第三方库
         */
        chunks: arrO
    }));
    entry[files[i]] = './src/js/' + files[i] + '.js';
}
/**
 * 入口文件添加块
 * @type {string[]}
 */
entry['vendor'] = ['vue', 'vue-router'];

module.exports = {
    entry: entry,
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    /**
     * 第三方库
     */
    externals: {
        Vue: "window.Vue",
        VueRouter: "window.VueRouter"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, include: util.root('sass'), loader: extractSass.extract(['css?sourceMap', 'sass'])},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=2000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    /**
     * 解析Vue文件里面的sass
     */
    vue: {
        loaders: {
            css: extractSass.extract("css?sourceMap"),
            sass: extractSass.extract(['css?sourceMap', 'sass'])
        }
    },
    postcss: [
        autoprefixer({browsers: ['>1%']})
    ],
    babel: {
        presets: ['es2015', 'stage-0']
    },
    plugins: [
        extractSass,
        /**
         * 添加解析第三方文件
         */
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ].concat(views)
};