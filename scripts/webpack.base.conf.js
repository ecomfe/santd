const path = require('path');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const {resolve} = require('./utils');
module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './example/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.san', '.less'],
        alias: {
            san: isProduction ? 'san/dist/san.spa.min.js' : 'san/dist/san.spa.dev.js',
            santd: resolve('./santd')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.san?$/,
                use: [
                    {
                        loader: 'babel-loader?cacheDirectory=true'
                    },
                    {
                        loader: 'hulk-san-loader',
                        options: {
                            hotReload: !isProduction,
                            sourceMap: isProduction,
                            minimize: isProduction
                        }
                    }
                ]
            },
            {
                test: /\.css?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isProduction ? true : false,
                            javascriptEnabled: true,
                            paths: [resolve('./')]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    plugins: [new ProgressPlugin()]
};
