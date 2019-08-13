const {posix, resolve} = require('path');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

exports.resolve = pathname => resolve(__dirname, '..', pathname);

exports.assetsPath = path => {
    let assetsSubDirectory =
        process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
    return posix.join(assetsSubDirectory, path);
};
