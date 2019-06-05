/**
* @file 组件文档编译
* @author chenkai13@baidu.com
*/

const path = require('path');
const merge = require('webpack-merge');
const fs = require('fs');
// const devWebpackConfig = require('./webpack.dev.conf');
const baseWebpackConfig = require('./webpack.base.conf');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {assetsPath, resolve} = require('./utils');
const querystring = require('querystring');
const webpack = require('webpack');

const basePath = path.resolve(__dirname, '..');
const compoPath = path.resolve(basePath, 'santd');
const compoList = fs.readdirSync(compoPath).filter(filename => {
    const st = fs.statSync(path.resolve(compoPath, filename));
    return st.isDirectory();
});

let entries = {};
compoList.filter(filename => filename !== 'core').forEach(compo => {
    entries[compo] = `./site/doc-entry.js?componentName=${compo}`;
});

baseWebpackConfig.entry = {};
module.exports = merge(baseWebpackConfig, {
    devtool: 'null',
    mode: 'none',
    entry: entries,
    output: {
        path: basePath + '/dist/source',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /doc-entry\.js$/,
            loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /\${componentName}/g,
                        replacement(match, p1, offset, string) {
                            let compoName = querystring.parse(this.resourceQuery.slice(1)).componentName;
                            return compoName;
                        }
                    }
                ]})
        }, {
            test: /\.md/,
            use: [
                {
                    loader: resolve('./scripts/loader/san-webpack-loader/index.js'),
                    options: {
                        hotReload: false,
                        sourceMap: true,
                        minimize: true
                    }
                },
                {
                    loader: resolve('./scripts/loader/markdown.js')
                }
            ]
        }]
    },
    plugins: [
        new StringReplacePlugin(),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].css'),
            chunkFilename: assetsPath('css/common.css')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});