/**
 * @file dev-server conf
 */
const path = require('path');
const {resolve} = path;

const fs = require('fs-extra');

const webpack = require('webpack');
const merge = require('webpack-merge');
const express = require('express');
const webpackDevServer = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./config');
const webpackConfig = require('./webpack.dev.conf');

const port = process.env.PORT || config.dev.port;
const app = express();

// 组件名称
const componentName = process.argv[2] || 'button';
if (componentName && fs.pathExistsSync(resolve(`./src/${componentName}`))) {
    // 存在组件
    start(componentName)
        .then(stats => {
            if (stats) {
                process.stdout.write(
                    stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n'
                );
            }

            console.log(`devServer address: http://localhost:${port}/`);
        })
        .catch(e => {
            process.stderr.write(
                e.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n'
            );
        });
} else {
    console.log(`${componentName} not exist!`);
}

function start(componentName) {
    return new Promise((resolve, reject) => {
        const entry = `src/${componentName}/docs/index`;
        let config = merge(webpackConfig, {
            resolve: {
                alias: {
                    '~entry': path.resolve(entry)
                }
            }
        });

        const compiler = webpack(config);
        compiler.hooks.done.tap('santd-webpack-build', stats => {
            const hasErrors = stats.hasErrors();
            if (hasErrors) {
                reject(stats);
            } else {
                resolve(stats);
            }
        });
        const devMiddleware = webpackDevServer(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true,
            compress: true,
            noInfo: true,
            stats: 'errors-only'
        });
        // 热加载
        const hotMiddleware = webpackHotMiddleware(compiler);
        // handle fallback for HTML5 history API
        app.use(require('connect-history-api-fallback')());

        app.use(devMiddleware);
        app.use(hotMiddleware);

        app.listen(port);
    });
}
