/**
 * @file 开发环境webpack配置
 * @author fuqiangqiang@baidu.com
 *   wangyongqing01@baidu.com
 */
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const {resolve} = require('./lib/utils');

// TODO:
// 1. 增加 splitChunks
// 2. 增加 babel import
module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './site/src/index.js'
    },
    output: {
        path: path.resolve('./output/site')
    },
    resolve: {
        alias: {
            '@docs': resolve('./docs')
        }
    }
});
