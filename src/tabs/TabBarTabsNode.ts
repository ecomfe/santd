/**
 * @file Santd tabs tab bar tabs node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../icon';
import Base from 'santd/base';
import {isVertical} from './utils';
import {classCreator} from '../core/util';
import type * as I from './interface';

const prefixCls = classCreator('tabs')();

const customTab = san.defineComponent({
    inited() {
        this.sourceSlots.named.tab = this.data.get('slot');
    },
    template: '<span><slot name="tab" /></span>'
});

export default class TabBarTabsNode extends Base<I.State, I.Props, I.ComputedBar> {
    static template = /* html */ `
        <div>
            <div
                s-for="tabBar, index in __tabBars__ trackBy index"
                role="tab"
                aria-disabled="{{tabBar.disabled ? true : false}}"
                aria-selected="{{tabBar.active ? true : false}}"
                class="{{tabBar.classes}}"
                index="{{index}}"
                style="{{tabBar.style}}"
                on-click="handleTabClick($event, tabBar.key, tabBar.disabled)"
            >
                <div class="{{tabBar.closable ? '${prefixCls}-tab-uncloseable' : ''}}" s-if="__type__ === 'editable-card'">
                    <template s-if="tabBar.slot">
                        <s-customtab slot="{{tabBar.slot}}"/>
                    </template>
                    <template s-else>
                        {{tabBar.tab}}
                    </template>
                    <span on-click="handleRemoveTab(tabBar.key, $event)" s-if="tabBar.closable === undefined ? true : tabBar.closable">
                        <s-customtab s-if="tabBar.closeIcon" slot="{{tabBar.closeIcon}}"/>
                        <s-icon
                            s-else
                            type="close"
                            class="${prefixCls}-close-x"
                        />
                    </span>
                </div>
                <template s-else>
                    <template s-if="tabBar.slot">
                        <s-customtab slot="{{tabBar.slot}}" />
                    </template>
                    <template s-else>
                        {{tabBar.tab}}
                    </template>
                </template>
            </div>
        </div>
    `;

    static components = {
        's-icon': Icon,
        's-customtab': customTab
    };

    static computed: I.ComputedBar = {
        __tabBars__(this: TabBarTabsNode) {
            const tabBarData = this.data.get('__tabBarData__') || [];
            const tabBarGutter = this.data.get('__tabBarGutter__');
            const tabPosition = this.data.get('__tabPosition__');
            const tabPanes = this.data.get('__tabPanes__') || [];

            return tabBarData.map((tabBar: Record<string, unknown>, index: number) => {
                const gutter = tabBarGutter && index === tabBarData.length - 1 ? 0 : tabBarGutter;
                const style = gutter !== undefined && {[isVertical(tabPosition) ? 'margin-bottom' : 'margin-right']: gutter + 'px'};
                const classArr = [`${prefixCls}-tab`];
                // 获取parent节点
                const slot = tabPanes[index] && tabPanes[index].sourceSlots.named.tab || null;
                const closeIcon = tabPanes[index] && tabPanes[index].sourceSlots.named.closeIcon || null;
                tabBar.active && classArr.push(`${prefixCls}-tab-active`);
                tabBar.disabled && classArr.push(`${prefixCls}-tab-disabled`);

                return {
                    ...tabBar,
                    slot,
                    closeIcon,
                    classes: classArr,
                    style
                };
            });
        },
    };

    handleTabClick(e: Event, key: string, disabled: boolean): void {
        if (disabled) {
            return;
        }
        this.fire('tabClick', {key, e});
    };

    handleRemoveTab(key: string, e: Event): void {
        e.stopPropagation();
        this.fire('removeTab', {key, e});
    };

    attached(): void {
        this.dispatch('santd_tabs_addRef', {
            name: 'navTabsContainer',
            ref: this.el
        });
    };
};
