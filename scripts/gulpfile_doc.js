/**
 * @file gulp打包组件文档脚本
 * @author chenkai13
 */
const gulp = require('gulp');
// const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const through2 = require('through2');
const resolve = require('./utils').resolve;

// const BasePath = path.resolve(__dirname, '..');

const DocDistPath = resolve('dist/doc');
gulp.task('default', done => {
    if (fs.existsSync(DocDistPath)) {
        rimraf.sync(DocDistPath);
    }
    const source = [resolve('dist/source/*.js')];
    gulp.src(source)
        .pipe(
            through2.obj(function (file, encoding, next) {
                // let content = file.contents.toString(encoding);
                let arr = file.path.split(/(\/|\\)/);
                let compoName = arr[arr.length - 1].replace(/\.js$/, '');
                let header = `
---
title: Santd - ${compoName}
header: santddoc
nav: components
sidebar: ${compoName}
---
<div id="app"></div><script src="/docs/santd/js/${compoName}.js"/>;
                `;
                file.contents = Buffer.from(header);
                file.path = file.path.replace(/\.js$/, '.html');
                this.push(file);
                next();
            })
        )
        .pipe(gulp.dest(DocDistPath));
    done();
});
