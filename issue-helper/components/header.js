/**
 * @file issue helper header file
 **/

import san from 'san';
import Button from 'santd/button';
import logo from '../assets/images/logo.png';

export default san.defineComponent({
    components: {
        's-button': Button
    },

    handleLocaleChange() {
        const lang = this.data.get('lang') === 'en' ? 'zh' : 'en';
        this.fire('changeLang', lang);
    },

    template: `<nav class="header san-layout-header">
        <div class="headerContainer">
            <div class="logo">
                <img
                    alt="logo"
                    width="40"
                    height="40"
                    src="${logo}"
                />
                <h1>Issue Helper</h1>
            </div>
            <div class="locale">
                <s-button size="small" on-click="handleLocaleChange">
                    {{lang === 'en' ? '中文' : 'English'}}
                </s-button>
            </div>
        </div>
    </nav>`
});
