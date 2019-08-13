#!/usr/bin/env node

/**
 * @file 生成santd的hexo文档
 * @author chenkai <chenkai13@baidu.com>
 */

const program = require('commander');
const path = require('path');
const fs = require('fs-extra');
// TODO： 这里要干掉 hulk 依赖，重写发包逻辑
const {downloadRepo, log, success, error} = require('@baidu/hulk-utils');

program
    .description('根据san组件的MD文档生成组件文档静态网站')
    .option('-s, --set <path>', '指定配置文件set.js的路径')
    .parse(process.argv);

const exists = fs.existsSync;
const rm = fs.removeSync;
const exec = require('child_process').execSync;

const resolve = path.resolve;

const createMenuFile = ({menu, pathMap}) => {
    const tab = '  ';
    const tabDep = [];
    let content = '';
    let node = menu;
    const readNode = node => {
        if (Array.isArray(node)) {
            tabDep.push(tab);
            for (let item of node) {
                readNode(item);
            }
            tabDep.shift();
        } else {
            content += `\n${tabDep.join('')}-`;
            tabDep.push(tab);
            Object.keys(node).forEach(key => {
                let val = node[key];
                if (typeof val === 'string') {
                    content += `\n${tabDep.join('')}${key}: ${val}`;
                } else {
                    content += `\n${tabDep.join('')}${key}:`;
                    readNode(val);
                }
            });
            tabDep.shift();
        }
    };
    readNode(menu);
    fs.writeFileSync(resolve(pathMap.navPath, 'nav.yml'), content, 'utf8');
};
const refreshDir = dir => {
    if (exists(dir)) {
        rm(dir);
    }
    fs.ensureDirSync(dir);
    // fs.mkdirSync(dir);
};
const createDocFile = set => {
    const {pathMap, title} = set;
    fs.ensureDirSync(pathMap.sourcePath);
    // const compoList = fs.readdirSync(options.compoPath).map(jsfile => jsfile.substr(0, jsfile.length - 3));
    fs.readdirSync(pathMap.compoOutputPath).forEach(sourceFile => {
        let compoName = sourceFile.substr(0, sourceFile.length - 3);
        let content = `---
title: ${title} - ${compoName}
header: ${set.menu.name}
nav: components
sidebar: ${compoName}
---
<div id="app"></div><script src="${set.root}js/${compoName}.js"/>;`;
        if (set.compoList[compoName]) {
            const compoDocFile = resolve(pathMap.docPath, `${set.compoList[compoName].folder}/${compoName}.html`);
            fs.writeFileSync(compoDocFile, content, 'utf8');
            fs.copyFileSync(resolve(pathMap.compoOutputPath, sourceFile), resolve(pathMap.sourcePath, sourceFile));
        }
    });
    Object.keys(set.compoList).forEach(key => {
        let compo = set.compoList[key];
        if (compo.source) {
            fs.copyFileSync(
                resolve(process.cwd(), compo.source),
                resolve(pathMap.docPath, compo.folder, `${key}.md`));
        }
    });
};

const getCompoList = set => {
    const nav = set.menu.nav;
    const compoList = {};
    const folderList = [];
    nav.forEach(nitem => {
        if (!nitem.sidebar) {
            return;
        }
        folderList.indexOf(nitem.name) < 0 && folderList.push(nitem.name);
        nitem.sidebar.forEach(sidebar => {
            if (sidebar.link && sidebar.name) {
                compoList[sidebar.name] =  {
                    folder: nitem.name,
                    link: sidebar.link,
                    source: sidebar.source
                };
            }
            Array.isArray(sidebar.leaf) && sidebar.leaf.forEach(leaf => {
                if (leaf.link && leaf.name) {
                    compoList[leaf.name] = {
                        folder: nitem.name,
                        link: leaf.link,
                        source: sidebar.source
                    };
                }
            });
        });
    });
    return {
        folderList,
        compoList
    };
};
const replaceFileStr = (filePath, reg, value) => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(reg, value);
    fs.writeFileSync(filePath, content, 'utf8');
};

const replaceHexoConfig = set => {
    const urlReg = /{{{::HEXO-CONFIG-URL::}}}/g;
    const rootReg = /{{{::HEXO-CONFIG-ROOT::}}}/g;
    const compoPathReg = /{{{::COMPO-PATH::}}}/g;
    const configFile = resolve(set.pathMap.hexoPath, '_config.yml');
    const docEntry = resolve(set.pathMap.hexoPath, '_script/doc-entry.js');
    replaceFileStr(configFile, urlReg, set.url);
    replaceFileStr(configFile, rootReg, set.root);
    replaceFileStr(docEntry, compoPathReg, resolve(process.cwd(), set.compoPath));
};
const run  = program => {
    let setFilePath = resolve(process.cwd(), program.set);
    let set = require(setFilePath);
    const distPath = resolve(process.cwd(), './dist');
    const hexoPath = resolve(distPath, 'hexo');
    const pathMap = {
        distPath,
        hexoPath,
        sourcePath: resolve(hexoPath, 'themes/docs/source/js'),
        docPath: resolve(hexoPath, 'source/_posts'),
        navPath: resolve(hexoPath, 'source/_data'),
        compoPath: set.compoPath,
        compoOutputPath: resolve(distPath, 'source')
    };
    const {folderList, compoList} = getCompoList(set);

    set.pathMap = pathMap;
    set.compoList = compoList;

    refreshDir(distPath);
    refreshDir(pathMap.hexoPath);
    // exec('npm run gen_doc');
    downloadRepo('hexo-doc-template', pathMap.hexoPath, {}, err => {
        if (err) {
            error(err);
        } else {
            replaceHexoConfig(set);
            log('开始编译组件...');
            const webpackFile = resolve(hexoPath, '_script/webpack.doc.conf.js');
            exec(`SET_FILE=${setFilePath} ./node_modules/.bin/webpack --config ${webpackFile}`);
            log('编译组件成功...');

            refreshDir(pathMap.docPath);

            folderList.forEach(folder => refreshDir(resolve(pathMap.docPath, folder)));
            if (set.menu) {
                createMenuFile(set);
            }
            if (set.compoPath) {
                createDocFile(set);
            }
            log('安装hexo依赖...');
            exec('cd ./dist/hexo && npm install');
            log('安装完成...');
        }
    });
};
run(program);