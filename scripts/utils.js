const path = require('path');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';
const resolve = pathname => path.resolve(__dirname, '..', pathname);
exports.resolve = resolve;

exports.assetsPath = _path => {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}