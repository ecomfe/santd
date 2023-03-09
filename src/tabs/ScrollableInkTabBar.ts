/**
 * @file Santd tabs scrollable ink tab bar file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import type * as I from './interface';
import Icon from '../icon';
import ScrollableTabBarNode from './ScrollableTabBarNode';
import TabBarTabsNode from './TabBarTabsNode';
import {
    isTransform3dSupported,
    getLeft,
    getTop
} from './utils';
import {classCreator} from '../core/util';

const prefixCls = classCreator('tabs')();

export default class ScrollableInkTabBar extends Base {
    static template = /* html */ `
        <div style="{{tabPosition === 'left' || tabPosition === 'right' ? 'height:100%;float:' + tabPosition : ''}}">
        <slot name="tab" />
            <div
                role="tablist"
                class="{{classes}}"
                style="{{tabBarStyle}}"
                tabIndex="0"
                on-keydown="handleKeyDown"
                s-ref="root"
            >
                <div
                    class="${prefixCls}-extra-content"
                    style="{{tabPosition === 'top' || tabPosition === 'bottom' ? 'float: right' : ''}}"
                >
                    <template s-if="type === 'editable-card' && !hideAdd">
                        <div on-click="handleCreateNewTab">
                            <slot name="addIcon" s-if="hasAddIcon"/>
                            <s-icon s-else type="plus" class="${prefixCls}-new-tab" />
                        </div>
                        <slot name="tabBarExtraContent" />
                    </template>
                    <slot name="tabBarExtraContent" s-else />
                </div>
                <s-scrollabletabbarnode
                    refs="{{refs}}"
                    tabBarPosition="{{tabPosition}}"
                >
                    <s-tabbartabsnode
                        s-bind="{{ownerData}}"
                        __tabPanes__="{{tabPanes}}"
                        __tabBarData__="{{tabBarData}}"
                        __type__="{{type}}"
                        __tabBarGutter__="{{tabBarGutter}}"
                        __tabPosition__="{{tabPosition}}"
                        on-tabClick="handleTabClick"
                        on-removeTab="handleRemoveTab"
                        s-ref="tabsNode"
                    />
                    <div
                        class="${prefixCls}-ink-bar ${prefixCls}-ink-bar-{{inkBarAnimated ? 'animated' : 'no-animated'}}"
                        style="{{inkBarStyles}}"
                        s-ref="inkBar"
                    />
                </s-scrollabletabbarnode>
            </div>
        </div>
    `;

    static components = {
        's-scrollabletabbarnode': ScrollableTabBarNode,
        's-tabbartabsnode': TabBarTabsNode,
        's-icon': Icon
    };
    style!: ScrollableInkTabBar;

    initData() {
        return {
            tabPosition: 'top',
            inkBarAnimated: true,
            refs: {}
        };
    };

    static computed = {
        classes(this: ScrollableInkTabBar) {
            const tabPosition = this.data.get('tabPosition');
            const size = this.data.get('size');
            const type = this.data.get('type');

            let classArr = [`${prefixCls}-bar`, `${prefixCls}-${tabPosition}-bar`];
            !!size && classArr.push(`${prefixCls}-${size}-bar`);
            type && type.indexOf('card') >= 0 && classArr.push(`${prefixCls}-card-bar`);

            return classArr.join(' ');
        }
    };

    static messages: I.MessagesScroll = {
        santd_tabs_addRef(payload) {
            // @ts-ignore
            this.data.set('refs.' + payload.value.name, payload.value.ref);
        },
    };

    handleTabClick(payload: I.Payload) {
        this.fire('tabClick', payload);
    };

    handleKeyDown(e: Event) {
        this.fire('keydown', e);
    };

    handleCreateNewTab() {
        this.fire('createNewTab');
    };

    handleRemoveTab(prop: I.Payload) {
        this.fire('removeTab', prop);
    };

    updateInkBar() {
        type ScrollableCtx = InstanceType<typeof ScrollableInkTabBar>;
        const refs = this.data.get('refs');
        const rootNode = this.ref('root');
        const wrapNode = refs.nav || rootNode;
        const inkBarNode: ScrollableCtx = this.ref('inkBar');
        const inkBarNodeStyle = inkBarNode && inkBarNode.style;
        const tabsNode: any = this.ref('tabsNode');
        const tabPosition = this.data.get('tabPosition');
        let tabBarData = this.data.get('tabBarData') || [];
        let activeTab: {
            offsetHeight?: number;
            offsetWidth?: number;
        } = {};
        tabBarData.forEach((tabBar: Record<string, unknown>, index: number) => {
            if (tabBar.active && tabsNode.children[1].children[index]) {
                activeTab = tabsNode.children[1].children[index].el;
                return;
            }
        });
        if (!inkBarNode || !activeTab) {
            return;
        }
        this.data.set('refs.activeTab', activeTab);
        const transformSupported = isTransform3dSupported(inkBarNodeStyle);
        let inkBarStyles = '';
        if (tabPosition === 'top' || tabPosition === 'bottom') {
            let left = getLeft(activeTab, wrapNode);
            let width = activeTab.offsetWidth;

            // use 3d gpu to optimize render
            inkBarStyles = transformSupported
                ? `transform: translate3d(${left}px, 0, 0);`
                : `left: ${left}px;`;
            inkBarStyles += `width: ${width}px;`;
        }
        else {
            let top = getTop(activeTab, wrapNode);
            let height = activeTab.offsetHeight;
            inkBarStyles = transformSupported
                ? `transform: translate3d(0, ${top}px, 0);`
                : `top: ${top}px;`;
            inkBarStyles += `height: ${height}px;`;
        }
        this.data.set('inkBarStyles', inkBarStyles);
    };

    attached() {
        this.data.set('refs.root', this.ref('root'));
        window.setTimeout(() => {
            this.updateInkBar();
        }, 0);
        this.watch('tabBarData', () => {
            this.nextTick(() => {
                this.updateInkBar();
            });
        });
    };
};
