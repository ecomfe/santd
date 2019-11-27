/**
 * @file 开发环境webpack配置
 * @author fuqiangqiang@baidu.com
 *   wangyongqing01@baidu.com
 */
// const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './site/preview/index.js'
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
});
