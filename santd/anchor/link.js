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
        href: DataTypes.string,
        className: DataTypes.string
    },
    initData() {
        return {
            href: '#'
        };
    },
    computed: {
        classes() {
            const href = this.data.get('href');
            const active = this.data.get('activeLink') === href;
            const className = this.data.get('className');

            let classArr = [className, `${prefixCls}-link`];
            active && classArr.push(`${prefixCls}-link-active`);

            return classArr;
        },
        titleClasses() {
            const active = this.data.get('activeLink') === this.data.get('href');

            let classArr = [`${prefixCls}-link-title`];
            active && classArr.push(`${prefixCls}-link-title-active`);

            return classArr;
        }
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
    template: `
        <div class="{{classes}}">
            <a
                class="{{titleClasses}}"
                href="{{href}}"
                title="{{title}}"
                on-click="handleClick"
            >
                {{title}}
            </a>
            <slot></slot>
        </div>
    `
});