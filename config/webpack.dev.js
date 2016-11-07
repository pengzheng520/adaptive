/**
 * Created by shenchangmin on 2016/10/14.
 */
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const util = require('./webpack.util');

module.exports = webpackMerge(common, {
    devtool: 'source-map',

    output: {
        path: util.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});