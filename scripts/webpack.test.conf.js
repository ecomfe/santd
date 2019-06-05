/**
* @file 单元测试用
* @author fuqiangqiang@baidu.com
*/

const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');

const baseWebpackConfig = merge(webpackBaseConfig, {
    devtool: '#cheap-module-eval-source-map'
});
// 在单元测试中不需要entry
delete baseWebpackConfig.entry;

module.exports = baseWebpackConfig;