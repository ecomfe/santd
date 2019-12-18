/**
 * @file issue helper i18n component
 **/

import san from 'san';
import qs from 'querystring';

const req = require.context('./locales', true, /\.md$/);
const reqVars = require.context('./locales', true, /\.js$/);

const texts = {en: {}, zh: {}};
const vars = {en: {}, zh: {}};

req.keys().forEach(mod => {
    const matches = mod.match('./(.+)/(.+).md');
    const locale = matches[1];
    const id = matches[2];
    texts[locale][id] = req(mod);
});

reqVars.keys().forEach(mod => {
    const matches = mod.match('./(.+).js');
    const locale = matches[1];
    vars[locale] = reqVars(mod).default;
});

function processLinks() {
    [...this.el.querySelectorAll('a')].forEach(a => {
        a.setAttribute('tabindex', '-1');
        const href = a.getAttribute('href');

        if (href) {
            if (href.charAt(0) !== '#') {
                a.setAttribute('target', '_blank');
            }
            else {
                a.addEventListener('click', () => {
                    this.fire(`click-${href.slice(1)}`);
                });
            }
        }
    });
}

export default san.defineComponent({
    inited() {
        const query = qs.parse(window.location.search.slice(1));

        this.data.set('lang', query && query.lang || 'zh');
    },
    computed: {
        i18n() {
            const lang = this.data.get('lang');
            return vars[lang];
        },
        i18nmd() {
            const lang = this.data.get('lang');
            return texts[lang];
        }
    },

    attached: processLinks,

    updated: processLinks,

    template: `<div>
        {{i18nmd[id].default.template || 'not found' + id | raw}}
    </div>`
});
