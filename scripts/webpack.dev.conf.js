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
const {assetsPath, resolve} = require('./utils');
const componentName = process.argv[2] || 'button';
// const utils = require('./utils');
const isProduction = false; // process.env.NODE_ENV === 'production';

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: `./site/dev-preview.js?componentName=${componentName}`
    },
    module: {
        rules: [
            {
                test: /\.md/,
                use: [
                    {
                        loader: resolve('./scripts/loader/san-webpack-loader/index.js'),
                        options: {
                            hotReload: !isProduction,
                            sourceMap: isProduction,
                            minimize: isProduction
                        }
                    },
                    {
                        loader: resolve('./scripts/loader/markdown.js')
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
            template: './site/index.html',
            inject: true
        })
    ]
});
