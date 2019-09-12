/**
 * @file Santd anchor link file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('anchor')();

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        href: DataTypes.string
    },
    initData() {
        return {
            href: '#'
        };
    },

    inited() {
        this.dispatch('santd_link_addInstance', this);
    },

    updated() {
        this.dispatch('santd_link_add', this.data.get('href'));
    },

    attached() {
        this.dispatch('santd_link_add', this.data.get('href'));
    },

    detached() {
        this.dispatch('santd_link_rm', this.data.get('href'));
    },

    handleClick(e) {
        const {href, title} = this.data.get();
        this.dispatch('santd_link_click', {
            e,
            link: {href, title}
        });
        this.dispatch('santd_link_scrollTo', href);
    },

    messages: {
        santd_link_add(payload) {
            // 修复子组件多层嵌套时dispatch顺序不正确的问题
            this.nextTick(() => {
                this.dispatch('santd_link_add', payload.value);
            });
        }
    },

    template: `
        <div class="${prefixCls}-link {{activeLink === href ? '${prefixCls}-link-active' : ''}}">
            <a
                class="${prefixCls}-link-title {{activeLink === href ? '${prefixCls}-link-title-active' : ''}}"
                href="{{href}}"
                title="{{title}}"
                on-click="handleClick"
            >
                {{title}}
            </a>
            <slot />
        </div>
    `
});
