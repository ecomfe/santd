/**
* @file 开发环境webpack配置
* @author fuqiangqiang@baidu.com
*/
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const {assetsPath, resolve} = require('./utils');
const isProduction = false; // process.env.NODE_ENV === 'production';

// 遍历组件文件夹，生成webpack copy plugin配置文件
let copyPlugins = [{from: 'README.md', to: 'README.md'}, {from: './docs/_sidebar.md', to: '_sidebar.md'}];
let sidebarInfo = '* [入门](README.md)\r\n\r\n* 组件\r\n';
try {
    const rootPath = path.resolve('santd');
    const docPath = path.resolve('docs');
    const componentsFolder = fs.readdirSync(rootPath);
    componentsFolder.forEach((v, k) => {
        // 排除掉core文件夹
        if (v === 'core') {
            return;
        }

        const stat = (fs.lstatSync(rootPath + '/' + v)) || {};
        if (stat.isDirectory()) {
            copyPlugins.push({from: './docs/components/' + v + '.md', to: 'components/' + v + '.md'});
            const sidebarCompInfo = `    * [${v}](/components/${v}.md)
`;
            sidebarInfo += sidebarCompInfo;
            // 将组件信息写入_sidebar.md
            fs.writeFileSync(docPath + '/_sidebar.md', sidebarInfo);
            const readmeInfo = '# ' + v + ' 组件\r\n```js\r\n/*san*/\r\n```';
            // 给每个组件写入一个对应的md文件供docsify使用
            fs.writeFileSync(docPath + '/components/' + v + '.md', readmeInfo);
        }

    });
}
catch (e) {
    console.log(e);
}
const entries = ['./docs/index.js'];
if (!isProduction) {
    entries.push('./docs/dev-client.js');
}

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: entries
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
                        loader: resolve('./scripts/loader/markdown.js'),
                        options: {
                            wrapper: 'div'
                        }
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
            template: './docs/index.html',
            inject: true
        }),
        new CopyWebpackPlugin(copyPlugins)
    ]
});
