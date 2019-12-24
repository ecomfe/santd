/**
 * @file marked
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import marked from 'marked';
import Prism from 'prismjs';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-json5';
import 'prismjs/components/prism-smarty';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-jsx';

import _emojify from './emojify';

let cache$1 = {};
const merge = Object.assign;
const hasOwn = Object.prototype.hasOwnProperty;
const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
const renderer = new marked.Renderer();

function lower(string) {
    return string.toLowerCase();
}

function emojify(text) {
    return text
        .replace(/<(pre|template|code)[^>]*?>[\s\S]+?<\/(pre|template|code)>/g, m => m.replace(/:/g, '__colon__'))
        .replace(/:(\w+?):/gi, _emojify)
        .replace(/__colon__/g, ':');
}

function helper(className, content) {
    return '<p class="' + className + '">' + content.slice(5).trim() + '</p>';
}

function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number';
}

function slugify(str) {
    if (typeof str !== 'string') {
        return '';
    }

    let slug = str
        .trim()
        .replace(/[A-Z]+/g, lower)
        .replace(/<[^>\d]+>/g, '')
        .replace(re, '')
        .replace(/\s/g, '-')
        .replace(/-+/g, '-')
        .replace(/^(\d)/, '_$1');
    let count = cache$1[slug];

    count = hasOwn.call(cache$1, slug) ? count + 1 : 0;
    cache$1[slug] = count;

    if (count) {
        slug = slug + '-' + count;
    }

    return slug;
}

slugify.clear = () => {
    cache$1 = {};
};

merge(renderer, {
    // 代码块
    code(code, lang = '') {
        const hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup);
        return `<pre v-pre data-lang="${lang}"><code class="lang-${lang}">${hl}</code></pre>`;
    },

    // 段落
    paragraph(text) {
        let result;
        if (/^!&gt;/.test(text)) {
            result = helper('tip', text);
        }
        else if (/^\?&gt;/.test(text)) {
            result = helper('warn', text);
        }
        else {
            result = `<p>${text}</p>`;
        }
        return result;
    },

    // 列表
    list(body, ordered, start) {
        const isTaskList = /<li class="task-list-item">/.test(body.split('class="task-list"')[0]);
        const isStartReq = start && start > 1;
        const tag = ordered ? 'ol' : 'ul';
        const tagAttrs = [isTaskList ? 'class="task-list"' : '', isStartReq ? `start="${start}"` : ''].join(' ').trim();
        return `<${tag} ${tagAttrs}>${body}</${tag}>`;
    },

    // 列表项
    listitem(text) {
        const isTaskItem = /^(<input.*type="checkbox"[^>]*>)/.test(text);
        const html = isTaskItem ? `<li class="task-list-item"><label>${text}</label></li>` : `<li>${text}</li>`;
        return html;
    },

    // 链接
    link(href, title, text) {
        let link = href;
        let target = '_blank';
        if (link.indexOf('.md') > 0) {
            link = `#/docs/${link.replace('.md', '')}`;
            target = '_self';
        }
        return `<a href="${link}" target="${target}" title="${title || ''}">${text}</a>`;
    }
});

module.exports = (text, options = {}) => {
    marked.setOptions(
        merge(options, {
            renderer: merge(renderer, options.renderer || {})
        })
    );

    let html;
    if (isPrimitive(text)) {
        html = marked(text);
    }
    else {
        html = marked.parser(text);
    }

    slugify.clear();

    html = options.noEmoji ? html : emojify(html);
    return html;
};
