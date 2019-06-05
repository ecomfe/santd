/**
 * @file doc san plugin root file
 * @author mayihui@baidu.com
 **/

/* eslint-disable max-len */
// import Prism from 'prismjs';
import hljs from 'highlight.js';
import generateComponent from './components';

// components 缓存类
class Components {
    constructor() {
        this.componentCache = {};
    }

    cache(component, id) {
        let href = window.location.href;
        let componentObj = {id, component};

        if (this.componentCache[href]) {
            this.componentCache[href].push(componentObj);
        }
        else {
            this.componentCache[href] = [componentObj];
        }
    }

    renderFromCache() {
        let href = window.location.href;
        let componentObjs = this.componentCache[href];
        if (componentObjs) {
            componentObjs.forEach((v, k) => {
                let Code = v.component();
                let instance = new Code();
                instance.attach(document.getElementById(v.id + ''));
            });
        }
    }
}

export default (hook, vm) => {
    let id = 0;
    let components = new Components();
    let renderComponent = (component, id) => {
        components.cache(component, id);

        window.setTimeout(() => {
            let Code = component();
            let instance = new Code();
            instance.attach(document.getElementById(id + ''));
        }, 0);
    };

    window.__components = components;

    window.$docsify.markdown = {
        renderer: {
            code(code, lang) {
                if (/^\/\*\s*san\s*\*\//.test(code) && vm.route.path !== '/README') {
                    id++;
                    let sanComponent = generateComponent(code, lang, vm.route.path);
                    renderComponent(sanComponent, id);
                    return '<div id="' + id + '"></div>';
                }
                else {
                    lang = lang || 'bash';
                    // console.log(hljs.highlight(lang, code, true).value)
                    // let newCode = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup);
                    let newCode = hljs.highlight(lang, code, true).value
                    return '<pre s-pre data-lang="' + lang + '"><code class="lang-"' + lang + '">' + newCode + '</code></pre>';
                }
            }
        }
    };

    hook.mounted(() => {
        vm.router.onchange(_ => {
            components.renderFromCache();
        });
    });
};
