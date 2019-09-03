/**
 * @file 开发环境webpack配置
 * @author fuqiangqiang@baidu.com
 *   wangyongqing01@baidu.com
 */
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');

const {resolve} = require('./lib/utils');
// const isProduction = process.env.NODE_ENV === 'production';
// TODO:
// 1. 增加 splitChunks
module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './site/src/index.js'
    },
    output: {
        path: path.resolve('./output/site'),
        publicPath: config.docs.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            '@docs': resolve('./docs')
        }
    }
});
