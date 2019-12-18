/**
 * @file 开发环境webpack配置
 * @author fuqiangqiang@baidu.com
 *   wangyongqing01@baidu.com
 */
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';
// TODO:
// 1. 增加 splitChunks
module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './issue-helper/index.js'
    },
    output: {
        path: config.issue.assetsRoot,
        publicPath: isProduction ? config.issue.assetsPublicPath : config.issue.devAssetsPublicPath,
        filename: '[name].js'
    }
});
