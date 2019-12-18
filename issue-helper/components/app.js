/**
 * @file issue helper app file
 **/

import san from 'san';
import i18n from '../i18n';
import {updateQuery} from '../helpers';
import header from './header';
import intro from './intro';
import report from './report';

export default san.defineComponent({
    components: {
        's-header': header,
        's-intro': intro,
        's-report': report
    },

    inited() {
        i18n.prototype.inited.bind(this)();
    },

    computed: {
        ...i18n.prototype.computed
    },

    setLang(lang) {
        this.data.set('lang', lang);
        updateQuery({lang});
    },

    template: `<div id="app" class="layout san-layout">
        <s-header lang="{{lang}}" on-changeLang="setLang" />
        <div class="content">
            <s-intro lang="{{lang}}" i18n="{{i18n}}" />
            <s-report lang="{{lang}}" i18n="{{i18n}}" />
        </div>
        <footer class="san-layout-footer">
            <div class="san-layout-footer" style="text-align: center;">
                Inspired by <a href="https://new-issue.vuejs.org/" target="_blank">Vue Issue Helper</a>
                · <a href="https://github.com/ecomfe/santd/tree/master/issue-helper">Source Code</a>
            </div>
        </footer>
    </div>`
});
