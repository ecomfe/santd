/**
 * @file config
 */

var path = require('path');

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, '../dest'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    dev: {
        port: 8822,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    doc: {
        port: 8889,
        assetsRoot: path.resolve(__dirname, '../output/site'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        devAssetsPublicPath: '/'
    },
    issue: {
        port: 8888,
        assetsRoot: path.resolve(__dirname, '../output/issue'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        devAssetsPublicPath: '/'
    }
};
