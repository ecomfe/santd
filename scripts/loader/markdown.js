/**
 * @file markdown
 * @author
 */

/* eslint-disable fecs-no-require, fecs-prefer-assign-pattern */

const path = require('path');

const compiler = require('./utils/compiler');

function getMarkdownDefaultSanCode(content, cls) {
    cls = cls || ['markdown'];
    if (!Array.isArray(cls)) {
        cls = cls.split(/\s+/);
    }

    if (!~cls.indexOf('markdown')) {
        cls.push('markdown');
    }

    return `
    <template><section class="${cls.join(' ')}">${content}</section></template>
    <script>export default{}</script>
`;
}
module.exports = function(content) {
    this.cacheable && this.cacheable();
    // const config = loaderUtils.getOptions(this);
    const {resourcePath} = this;

    // 非 santd docs文件夹下的，是普通 markdown 文件
    if (/santd\/[^/]+\/README\.md$/.test(resourcePath)) {
        return getMarkdownDefaultSanCode(compiler(content), 'api-container');
    } else if (!/santd\/[^/]+\/docs\/[^/]+\.md$/.test(resourcePath)) {
        return getMarkdownDefaultSanCode(compiler(content));
    }

    // getsource
    const m = content.match(/```html\s+(.*)\s+```/s);
    let code;
    if (m && m[1]) {
        code = m[1];
    }

    // getcn
    const cnReg = /<(cn)>\s*(.+)\s*<\/\1>/s;

    let cnMd;
    const cn = content.match(cnReg);
    if (cn && cn[1]) {
        cnMd = cn[2];
    }

    const cnHtml = cnMd ? compiler(cnMd) : cnMd;

    let codeHtml = code ? compiler('```html\n' + code + '\n```') : code;

    if (!codeHtml) {
        // 说明是纯 markdown
        return getMarkdownDefaultSanCode(compiler(content));
    }

    // 解决文档中的语法被解析的问题
    codeHtml = codeHtml
        .replace(/{{/g, '{<span></span>{')
        .replace(/}}/g, '}<span></span>}')
        .replace(/\${/g, '$<span></span>{')
        .replace(/`/g, '\\`');

    const requireReg = /<![-]{2,}require\((['"])(.+?)\1\)[-]{2,}>/;
    const requirejs = content.match(requireReg);
    let dyImport;
    if (requirejs && requirejs[2]) {
        // 说明使用了`<!--require()-->`语法引入
        const importFilePath = path.resolve(resourcePath, requirejs[2]);
        dyImport = `import uiPreview from "${importFilePath}";`;
    } else {
        const pickLoader = path.join(__dirname, './utils/pickFence.js');
        const fakemd = path.join(__dirname, './utils/_fakemd?mdurl=' + resourcePath + '&_t=' + Date.now());
        dyImport =
            `import uiPreview from "${path.join(__dirname, './san-webpack-loader')}!` +
            `${pickLoader}?url=${resourcePath}!${fakemd}";`;
    }

    let pathMatch = /santd\/([^/]+)\/docs\/([^/]+)\.md$/.exec(resourcePath);
    let id = 'components-demo-' + Date.now();
    if (pathMatch) {
        id = `components-${pathMatch[1]}-demo-${pathMatch[2]}`;
    }

    const template = `
<template>
    <section class="code-box {{isExpand?'expand':''}}" id="${id}">
        <section class="code-box-demo"><ui-preview/></section>
        <section class="code-box-meta markdown">
            ${cnHtml}
            <span class="code-expand-icon" on-click="toggleExpand">
                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?'code-expand-icon-hide':'code-expand-icon-show'}}">
                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?'code-expand-icon-show':'code-expand-icon-hide'}}">
            </span>
        </section>
        <section class="highlight-wrapper {{isExpand?'highlight-wrapper-expand':''}}">${codeHtml}</section>
    </section>
</template>
<script>
${dyImport}
export default {
    initData(){
        return {
            isExpand: false
        }
    },
    toggleExpand(){
        this.data.set('isExpand', !this.data.get('isExpand'));
    },
    components:{
        'ui-preview': uiPreview
    }
};
</script>
`;
    return template;
};
