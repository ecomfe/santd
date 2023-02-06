const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const config = require('./config');
const {resolve, assetsPath} = require('./lib/utils');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false: '#cheap-module-eval-source-map',
    entry: {
        app: './example/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.san', '.less', '.ts', '.tsx'],
        alias: {
            'san': isProduction ? 'san/dist/san.spa.min.js' : 'san/dist/san.spa.dev.js',
            'santd/es': resolve('./src'),
            'santd': resolve('./src')
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
                        loader: 'san-loader',
                        options: {
                            hotReload: !isProduction,
                            sourceMap: isProduction,
                            minimize: isProduction
                        }
                    }
                ]
            },
            {
                test: /\.md/,
                use: [
                    {
                        loader: 'hulk-markdown-loader'
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
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].css'),
            chunkFilename: assetsPath('css/common.css')
        }),
        new NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './site/index.html',
            inject: true
        })
    ]
};
