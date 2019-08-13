/**
 * @file npm 发布脚本，生成 lib 和 es 目录
 * @author wangyongqing <wangyongqing01@baidu.com>
 */


// TODO:
// 1. 获取当前版本
// 2. 输入新的版本号
// 3. 执行 npm version
// 4. 开始下面的流程生成 dist 内容
// 5. 手动发包？还是直接 exec？暂时手动吧，方便调试 release 脚本
const fs = require('fs-extra');
const path = require('path');

const babel = require('./lib/babel');
const copyFile = require('./lib/copy-file');

const dest = path.join(__dirname, '../dist');
const source = path.join(__dirname, '../santd');

// clear dir
fs.emptyDirSync(dest);
// fs.emptyDirSync(libDir);

const exclude = ['*/docs/**', '*/__tests__/**', './node_modules/**'];
console.log('开始 copy ESNext 文件');
console.time('esnext');
// compile es dir
const esnextDest = path.join(dest, 'es');

copyFile(
    source,
    esnextDest,
    (content, file, cb) => {
        if (file.extname === '.less') {
            content = content.replace(/@import\s+(['"])~santd\/(.+?)\1/, '@import $1../../$2$1');
            file.contents = Buffer.from(content);
        }
        cb(null, file);
    },
    exclude
);
console.timeEnd('esnext');

// 产出 es5 文件
const es5Dest = path.join(dest, 'lib');
console.log('开始生成 ES5 文件');
console.time('es5');

fs.mkdirpSync(es5Dest);
babel(source, es5Dest, {
    pkgName: 'santd',
    exclude,
    babelPlugins: [
        require('@babel/plugin-syntax-dynamic-import'),
        require('@babel/plugin-syntax-import-meta'),
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-transform-new-target'),
        require('@babel/plugin-transform-modules-commonjs')
    ]
}).then(d => {
    // 收尾 copy readme package.json 等
    console.timeEnd('es5');
    ['README.md', 'package.json'].forEach(f => {
        fs.copyFileSync(path.join(__dirname, `../${f}`), path.join(dest, f));
    });
    console.log('success');
});
