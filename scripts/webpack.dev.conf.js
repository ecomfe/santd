/**
 * @file 开发环境webpack配置
 * @author fuqiangqiang@baidu.com
 *   wangyongqing01@baidu.com
 */
// const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const {assetsPath} = require('./lib/utils');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: `./site/preview/main.js`
    },
    module: {
        rules: [
            {
                test: /\.md/,
                use: [
                    {
                        loader: 'hulk-markdown-loader'
                    }
                ]
            }
        ]
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].css'),
            chunkFilename: assetsPath('css/common.css')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './site/preview/index.html',
            inject: true
        })
    ]
});
