/**
 * @file dev-server conf
 */
const webpack = require('webpack');
const express = require('express');
const webpackDevServer = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./config');
const webpackConfig = require('./webpack.issue.conf');

const port = process.env.PORT || config.doc.port;
const app = express();

start()
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

function start() {
    return new Promise((resolve, reject) => {
        let config = webpackConfig;

        const compiler = webpack(config);
        compiler.hooks.done.tap('santd-webpack-build', stats => {
            const hasErrors = stats.hasErrors();
            if (hasErrors) {
                reject(stats);
            }
            else {
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
