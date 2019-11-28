/**
 * @file Created on Mon Nov 26 2018
 * @author wangyongqing <wangyongqing01@baidu.com>
 */
const path = require('path');
const babel = require('@babel/core');

const copyFiles = require('./copy-file');

module.exports = (from, to, options) => {
    let {pkgName, babelPlugins = [], babelPresets = ['@babel/preset-env'], es5DirName = 'es5', exclude = []} = options;

    if (!Array.isArray(babelPlugins) && babelPlugins) {
        babelPlugins = [babelPlugins];
    }
    return copyFiles(
        from,
        to,
        babelTransform({
            presets: babelPresets,
            plugins: [
                ...babelPlugins
            ]
        }),
        exclude
    );
};

function babelTransform(opts = {}) {
    return (content, file, cb) => {
        if (path.parse(file.path).ext !== '.js') {
            return cb(null, file);
        }
        const fileOpts = Object.assign({}, opts, {
            filename: file.path,
            filenameRelative: file.relative,
            sourceMap: false,
            sourceFileName: file.relative
        });

        babel
            .transformAsync(content, fileOpts)
            .then(res => {
                if (res) {
                    file.contents = Buffer.from(res.code); // eslint-disable-line
                    file.babel = res.metadata;
                }

                cb(null, file);
            })
            .catch(err => {
                throw err;
            });
    };
}
