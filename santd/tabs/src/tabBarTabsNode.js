/**
 * @file Santd tabs tab bar tabs node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import {isVertical} from './utils';

const tab = san.defineComponent({
    compiled() {
        const parent = this.parent;
        const parentComponent = this.parentComponent;
        const injectComponent = parentComponent.data.get('injectComponent');

        const index = parent.el.getAttribute('index');
        if (injectComponent) {
            const tab = parentComponent.data.get('childs')[index].tab;
            this.components.tab = injectComponent(tab) || tab;
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    computed: {
        isComponent() {
            const instance = this.data.get('instance');
            return instance && instance.components.tab && typeof instance.components.tab === 'function';
        }
    },
    template: `
        <span>{{content}}
            <tab s-if="isComponent" closable="{{closable}}" tab="{{tab}}" key="{{key}}"></tab>
            <template s-else>{{tab}}</template>
        </span>
    `
});

export default san.defineComponent({
    computed: {
        childs() {
            const children = this.data.get('children') || [];
            const activeKey = this.data.get('activeKey');
            const prefixCls = this.data.get('prefixCls');
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabBarPosition = this.data.get('tabBarPosition');

            return children.map((child, index) => {
                const key = child.data.get('key');
                const closable = child.data.get('closable');
                const gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;
                const style = gutter !== undefined && {
                    [isVertical(tabBarPosition) ? 'margin-bottom' : 'margin-right']: gutter + 'px'
                };
                const tab = child.data.get('tab');
                let classArr = [`${prefixCls}-tab`];
                activeKey === key && classArr.push(`${prefixCls}-tab-active`);
                child.data.get('disabled') && classArr.push(`${prefixCls}-tab-disabled`);
                return {
                    key: key,
                    className: classArr.join(' '),
                    tab: tab,
                    style: style,
                    closable: closable,
                    iconTab: typeof tab === 'function'
                };
            });
        }
    },
    updated() {
        const nodes = this.children[1].children;
        const activeKey = this.data.get('activeKey');
        const childs = this.data.get('childs');
        childs.forEach((child, index) => {
            if (child.key === activeKey) {
                this.dispatch('addRef', {
                    name: 'activeTab',
                    ref: nodes[index].el
                });
            }
            /*if (!inited && child.iconTab) {
                const Component = child.tab;
                const iconTab = new Component();
                iconTab.attach(nodes[index].el);
                iconTab.parent = iconTab.parentComponent = this;
                this.data.set('inited', true);
            }*/
        });
    },
    handleTabClick(e, key) {
        this.dispatch('tabClick', {key, e});
        this.fire('tabClick', {key, e});
    },
    attached() {
        this.dispatch('addRef', {
            name: 'navTabsContainer',
            ref: this.el
        });
    },
    components: {
        's-tabnode': tab
    },
    template: `
        <div>
            <div
                s-for="child, index in childs trackBy index"
                role="tab"
                aria-disabled="{{child.disabled ? true : false}}"
                aria-selected="{{activeKey === child.key ? true : false}}"
                class="{{child.className}}"
                key="{{child.key}}"
                index="{{index}}"
                style="{{child.style}}"
                on-click="handleTabClick($event, child.key)"
            >
                <s-tabnode tab="{{child.tab}}" closable="{{child.closable}}" key="{{child.key}}"></s-tabnode>
                <!--<template s-if="!child.iconTab">
                    {{child.tab}}
                </template>
                <template s-else>
                    <s-tabnode></s-tabnode>
                </template>-->
            </div>
        </div>
    `
});
