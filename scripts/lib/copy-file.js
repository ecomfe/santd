/**
 * @file Created on Mon Nov 26 2018
 * @author wangyongqing <wangyongqing01@baidu.com>
 */
const path = require('path');

const vfs = require('vinyl-fs');
const map = require('map-stream');
const concat = require('concat-stream');

module.exports = (src, dest, callback, exclude = []) => {
    return copyFiles(
        path.resolve(src),
        path.join(dest, './'),
        typeof callback === 'function' ? callback : undefined,
        exclude
    );
};

/**
 * 从一个目录复制到另外一个目录
 */
function copyFiles(from, to, callback, exclude = ['./__tests__/**', './node_modules/**']) {
    return new Promise((resolve, reject) => {
        vfs.src(['**'].concat(...exclude.map(e => '!' + e)), {
            cwd: from
        })
            .pipe(callback ? streamFile(callback) : map((file, cb) => cb(null, file)))
            .pipe(vfs.dest(to))
            .on('finish', resolve)
            .on('error', reject);
    });
}

/**
 * 合并 stream 文件
 */
function streamFile(fn, ...args) {
    return map((file, cb) => {
        if (file.isBuffer()) {
            // console.log(file.path, enc);
            const str = file.contents.toString();
            fn(str, file, cb, ...args);
        } else if (file.isStream()) {
            file.contents.pipe(
                concat(str => {
                    try {
                        fn(str, file, cb, ...args);
                    } catch (e) {
                        cb(e);
                    }
                })
            );
        } else {
            cb(null, file);
        }
    });
}
