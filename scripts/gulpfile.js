/**
 * @file gulp打包脚本
 * @author chenkai13
 */
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const resolve = require('./utils').resolve;
// const webpack = require('webpack');
const babel = require('gulp-babel');
const less = require('gulp-less');
const through2 = require('through2');

// const BasePath = resolve(__dirname, '..');
const BuildPath = resolve('build');
const LibPath = path.resolve(BuildPath, 'lib');
const ESPath = path.resolve(BuildPath, 'es');
let isESBuild = process.argv.pop() === '--esBuild';
// const ESPath = resolve( 'es');

let compoDependencies = {}; // 存组件内的npm依赖

const isFilterFile = path => {
    let regList = [/(\/|\\)docs(\/|\\)/, /(\/|\\)__tests__(\/|\\)/, /(\/|\\)node_modules(\/|\\)/];
    for (let reg of regList) {
        if (path.match(reg)) {
            return true;
        }
    }
    return false;
};

const getDepth = path => {
    let pathlist = path.split(/[/\\]/);
    let step = pathlist.length - 2;
    let up = '';
    while (step >= 0 && pathlist[step] !== 'santd') {
        up += '../';
        step--;
    }
    return up;
};
gulp.task('clearBuildPath', done => {
    console.log('clearBuildPath');
    const p = isESBuild ? ESPath : LibPath;
    if (fs.existsSync(p)) {
        rimraf.sync(p);
    }
    done();
});
const transSVG = content => {
    // let hasStyleElement = /<style[\s\S]*?>[\s\S]*?<\/style>/i.test(content);
    let data;
    if (typeof content === 'string') {
        content = new Buffer(content);
    }
    data = 'data:image/svg+xml;base64,' + content.toString('base64');
    return 'module.exports = ' + JSON.stringify(data);
};

gulp.task('transStyle', () => {
    console.log('transStyle');
    const lessSource = [resolve('santd/**/*.less')];
    return gulp
        .src(lessSource)
        .pipe(
            through2.obj(function(file, encoding, next) {
                let content = file.contents.toString(encoding);
                content = content.replace(/@import\s+(['"])santd/g, '@import $1../..');
                // console.log(content);
                file.contents = Buffer.from(content);
                this.push(file);
                next();
            })
        )
        .pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});

gulp.task('transNodeModule', () => {
    console.log('transNodeModule');
    return gulp.src([resolve('santd/**/node_modules/**')]).pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});

gulp.task('transFiles', gulp.parallel('transStyle'));

gulp.task('packageJson', () => {
    return gulp
        .src([resolve('package.json')])
        .pipe(
            through2.obj(function(file, encoding, next) {
                let content = file.contents.toString(encoding);
                let santdPackageJSON = JSON.parse(content);
                santdPackageJSON.dependencies = Object.assign({}, santdPackageJSON.dependencies, compoDependencies);
                content = JSON.stringify(santdPackageJSON, '', '\t');
                file.contents = Buffer.from(content);
                this.push(file);
                next();
            })
        )
        .pipe(gulp.dest(BuildPath));
});
gulp.task('checkPath', gulp.series(['clearBuildPath', 'transFiles', 'packageJson']));
gulp.task('compileStyle', () => {
    const lessSource = [
        path.resolve(isESBuild === false ? LibPath : ESPath, '**/style/index.less'),
        path.resolve(isESBuild === false ? LibPath : ESPath, '**/styles/index.less'),
        path.resolve(isESBuild === false ? LibPath : ESPath, '**/styles/mixins/index.less'),
        path.resolve(isESBuild === false ? LibPath : ESPath, '**/styles/themes/default.less')
    ];
    return gulp
        .src(lessSource)
        .pipe(
            less({
                javascriptEnabled: true
            })
        )
        .pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});
gulp.task('compileJs', () => {
    const source = [resolve('santd/**/*.js')];
    return gulp
        .src(source)
        .pipe(
            through2.obj(function(file, encoding, next) {
                // this.push(file.clone());
                // 过滤无需打包文件
                if (file.contents && !isFilterFile(file.path)) {
                    let content = file.contents.toString(encoding);
                    // console.log('js file :', file.path);
                    let up = getDepth(file.path);
                    content = content
                        .replace(/from\s+(['"])santd\//g, `from $1${up}`)
                        .replace(/(require\(.*\.html)/g, '$1.js') // 替换对html文件的引用
                        .replace(/(.*\.svg)(["']);/g, '$1.js$2'); // 替换对svg文件的引用
                    if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                        // 处理style/index.js内的样式引用
                        content = content
                            .replace(/(\/|\\)style(\/|\\)?'/g, "/style/css'") // eslint-disable-line
                            .replace(/(\/|\\)style(\/|\\)?"/g, '/style/css"')
                            .replace(/\.less/g, '.css')
                            .replace(/import\s+(["'])santd/g, 'import $1../..');
                        file.path = file.path.replace(/index\.js/, 'css.js');
                    } else {
                        // 删除 除style/index.js文件外其他js文件内对样式的引用
                        content = content.replace(/import\s.*\.\/style\/.*?;/g, '');
                    }
                    // console.log(content);
                    file.contents = Buffer.from(content);
                    this.push(file);
                }
                next();
            })
        )
        .pipe(
            isESBuild
                ? through2.obj()
                : babel({
                      presets: [
                          [
                              '@babel/preset-env',
                              {
                                  targets: {
                                      browsers: [
                                          'last 2 versions',
                                          'Firefox ESR',
                                          '> 1%',
                                          'ie >= 9',
                                          'iOS >= 8',
                                          'Android >= 4'
                                      ]
                                  }
                              }
                          ]
                      ],
                      plugins: [
                          [
                              'import',
                              {
                                  libraryName: '@baidu/santd',
                                  style: 'css'
                              }
                          ],
                          '@babel/plugin-proposal-export-default-from'
                      ]
                  })
        )
        .pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});
gulp.task('compileTxt', () => {
    const source = [resolve('santd/**/*.html')];
    return gulp
        .src(source)
        .pipe(
            through2.obj(function(file, encoding, next) {
                this.push(file.clone());
                if (file.contents && !isFilterFile(file.path)) {
                    let content = file.contents.toString(encoding);
                    content = 'define(function(){return `' + content + '`;});';
                    file.contents = Buffer.from(content);
                    file.path = file.path + '.js';
                    this.push(file);
                }
                next();
            })
        )
        .pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});
gulp.task('compileSvg', () => {
    const source = [resolve('santd/**/*.svg')];
    return gulp
        .src(source)
        .pipe(
            through2.obj(function(file, encoding, next) {
                this.push(file.clone());
                if (file.contents && !isFilterFile(file.path)) {
                    let content = file.contents.toString(encoding);
                    content = transSVG(content);
                    file.contents = Buffer.from(content);
                    file.path = file.path + '.js';
                    this.push(file);
                }
                next();
            })
        )
        .pipe(gulp.dest(isESBuild === false ? LibPath : ESPath));
});

gulp.task('integratePackage', () => {
    const source = [resolve('santd/*/package.json')];
    return gulp.src(source).pipe(
        through2.obj(function(file, encoding, next) {
            if (file.contents && !isFilterFile(file.path)) {
                let content = file.contents.toString(encoding);
                const pkgJSON = JSON.parse(content);
                if (pkgJSON.dependencies) {
                    Object.assign(compoDependencies, pkgJSON.dependencies);
                }
            }
            next();
        })
    );
});

gulp.task('compile', gulp.parallel('compileStyle', 'compileJs', 'compileTxt', 'compileSvg'));

gulp.task('default', gulp.series(['integratePackage', 'checkPath', 'compile']));
