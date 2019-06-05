/**
 * @file doc-server conf
 * @author mayihui@baidu.com
 */

const path = require('path');
// const fs = require('fs');
// const resolve = path;
// const pathExistsSync = require('fs-extra');
const webpack = require('webpack');
const express = require('express');
const config = require('../config');
const webpackConfig = require('./webpack.docs.conf');

const port = process.env.PORT || config.docs.port;
const app = express();

// 存在组件
const compiler = webpack(webpackConfig);


const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});
// 热加载
const hotMiddleware = require('webpack-hot-middleware')(compiler);
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
});
