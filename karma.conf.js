/**
* @file karma.conf.js karma配置文件
* @author fuqiangqiang@baidu.com
*/
const webpackConfig = require('./scripts/webpack.test.conf.js');
const componentName = process.argv[4] || '*';
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      `./santd/${componentName}/__tests__/*.js`
    ],
    exclude: [],
    preprocessors: {
      [`./santd/${componentName}/__tests__/*.js`]: ['webpack']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig
  })
}