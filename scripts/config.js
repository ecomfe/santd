/**
 * @file config
 */

var path = require('path');

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    dev: {
        port: 8822,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    docs: {
        port: 8889,
        assetsSubDirectory: 'static',
        assetsPublicPath: './'
    }
};
