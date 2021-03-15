/**
* @file layout.js
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import {classCreator} from '../core/util';
import './style/index';

const generator = function ({suffixCls, tagName}) {
    const prefixCls = classCreator(suffixCls)();
    const template = `
        <${tagName}
            class="${prefixCls} {{hasSider || siders.length > 0 ? '${prefixCls}-has-sider' : ''}} {{className}}"
        >
            <slot />
        </${tagName}>
    `;
    const baseComponent = san.defineComponent({
        messages: {
            santd_layout_addSider(payload) {
                this.data.push('siders', payload.value);
            },
            santd_layout_removeSider(payload) {
                const siders = this.data.get('siders');
                this.data.set('siders', siders.filter(sider => sider !== payload.value));
            }
        },
        initData() {
            return {
                siders: []
            };
        },
        template: template
    });
    return baseComponent;
};


const Layout = generator({
    suffixCls: 'layout',
    tagName: 'section'
});

const Header = generator({
    suffixCls: 'layout-header',
    tagName: 'header'
});

const Footer = generator({
    suffixCls: 'layout-footer',
    tagName: 'footer'
});

const Content = generator({
    suffixCls: 'layout-content',
    tagName: 'main'
});

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
