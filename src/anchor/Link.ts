/**
 * @file Santd anchor link file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import {classCreator} from '../core/util';

const prefixCls = classCreator('anchor')();

export interface LinkData {
    href: '#' | string;
};

export interface LinkMessage {
    santd_link_add: (this: Link, payload: {value: string}) => void;
};

export default class Link extends Base {
    initData(): LinkData {
        return {
            href: '#'
        };
    };

    inited(): void {
        this.dispatch('santd_link_addInstance', this);
    };

    updated(): void {
        this.dispatch('santd_link_add', this.data.get('href'));
    };

    attached(): void {
        this.dispatch('santd_link_add', this.data.get('href'));
    };

    detached(): void {
        this.dispatch('santd_link_rm', this.data.get('href'));
    };

    handleClick(e: Event): void {
        const {href, title} = this.data.get() as {
            href: string;
            title: string;
        };
        this.dispatch('santd_link_click', {
            e,
            link: {href, title}
        });
        this.dispatch('santd_link_scrollTo', href);
    };

    static messages: LinkMessage = {
        santd_link_add(this, payload) {
            // 修复子组件多层嵌套时dispatch顺序不正确的问题
            this.nextTick(() => {
                this.dispatch('santd_link_add', payload.value);
            });
        },
    };

    static template = /* html */ `
        <div class="${prefixCls}-link {{activeLink === href ? '${prefixCls}-link-active' : ''}}">
            <a
                class="${prefixCls}-link-title {{activeLink === href ? '${prefixCls}-link-title-active' : ''}}"
                href="{{href}}"
                title="{{title}}"
                target="{{target}}"
                on-click="handleClick"
            >
                {{title}}
            </a>
            <slot />
        </div>
    `;
};
