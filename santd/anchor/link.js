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
        this.dispatch('addLink', this);
    },
    updated() {
        this.dispatch('registerLink', this.data.get('href'));
    },
    attached() {
        this.dispatch('registerLink', this.data.get('href'));
    },
    detached() {
        this.dispatch('unRegisterLink', this.data.get('href'));
    },
    handleClick(e) {
        const {href, title} = this.data.get();
        this.dispatch('handleClick', {
            e,
            link: {href, title}
        });
        this.dispatch('scrollTo', href);
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
