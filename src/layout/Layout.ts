/**
* @file layout.js
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import type * as I from './interface';
import './style/index';
import type {TSider} from './Sider';

/* eslint-disable func-names */
const generator = function ({suffixCls, tagName}: I.GeneratorProps) {
/* eslint-enable func-names */
    const prefixCls = classCreator(suffixCls)();
    const template = `
        <${tagName}
            class="${prefixCls} {{hasSider || siders.length > 0 ? '${prefixCls}-has-sider' : ''}} {{className}}"
        >
            <slot />
        </${tagName}>
    `;
    type Message = {
        santd_layout_addSider: (this: BaseComponent, payload: I.Payload) => void;
        santd_layout_removeSider: (this: BaseComponent, payload: I.Payload) => void;
    };
    class BaseComponent extends Base<I.BaseState, I.BaseProps> {
        static template: string = template;
        static Header: THeader;
        static Footer: TFooter;
        static Content: TContent;
        static Sider: TSider;
        static messages: Message = {
            santd_layout_addSider(payload) {
                this.data.push('siders', payload.value);
            },
            santd_layout_removeSider(payload) {
                const siders = this.data.get('siders');
                this.data.set('siders', siders.filter((sider: string) => sider !== payload.value));
            }
        };
        initData(): I.BaseState {
            return {
                siders: []
            };
        }
    }
    return BaseComponent;
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

export type THeader = typeof Header;
export type TFooter = typeof Footer;
export type TContent = typeof Content;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
