/**
 * @file Santd tabs scrollable ink tab bar file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../icon';
import ScrollableTabBarNode from './scrollableTabBarNode';
import TabBarTabsNode from './tabBarTabsNode';
import {
    isTransform3dSupported,
    getLeft,
    getTop
} from './utils';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    components: {
        's-scrollabletabbarnode': ScrollableTabBarNode,
        's-tabbartabsnode': TabBarTabsNode,
        's-icon': Icon
    },
    initData() {
        return {
            tabBarPosition: 'top',
            inkBarAnimated: true,
            refs: {}
        };
    },
    computed: {
        classes() {
            const tabPosition = this.data.get('tabBarPosition');
            const size = this.data.get('size');
            const type = this.data.get('type');

            let classArr = [`${prefixCls}-bar`, `${prefixCls}-${tabPosition}-bar`];
            !!size && classArr.push(`${prefixCls}-${size}-bar`);
            type && type.indexOf('card') >= 0 && classArr.push(`${prefixCls}-card-bar`);

            return classArr.join(' ');
        }
    },
    messages: {
        santd_tabs_addRef(payload) {
            this.data.set('refs.' + payload.value.name, payload.value.ref);
        }
    },
    handleTabClick(payload) {
        this.fire('tabClick', payload);
    },
    handleKeyDown(e) {
        this.fire('keydown', e);
    },
    handleCreateNewTab() {
        this.fire('createNewTab');
    },
    handleRemoveTab(prop) {
        this.fire('removeTab', prop);
    },
    updateInkBar(component, init) {
        const refs = this.data.get('refs');
        const rootNode = this.ref('root');
        const wrapNode = refs.nav || rootNode;
        const inkBarNode = this.ref('inkBar');
        const inkBarNodeStyle = inkBarNode && inkBarNode.style;
        const tabsNode = this.ref('tabsNode');
        const tabBarPosition = this.data.get('tabBarPosition');
        let tabBarData = this.data.get('tabBarData') || [];
        let activeTab;
        tabBarData.forEach((tabBar, index) => {
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
        if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
            let left = getLeft(activeTab, wrapNode);
            let width = activeTab.offsetWidth;

            // use 3d gpu to optimize render
            inkBarStyles = transformSupported
                ? `transform: translate3d(${left}px, 0, 0);`
                : `left: ${left}px;`;
            inkBarStyles += `width: ${width}px;`;
        }
        else {
            let top = getTop(activeTab, wrapNode, true);
            let height = activeTab.offsetHeight;
            inkBarStyles = transformSupported
                ? `transform: translate3d(0, ${top}px, 0);`
                : `top: ${top}px;`;
            inkBarStyles += `height: ${height}px;`;
        }
        this.data.set('inkBarStyles', inkBarStyles);
    },
    attached() {
        this.data.set('refs.root', this.ref('root'));
        window.setTimeout(() => {
            this.updateInkBar();
        }, 0);
        this.watch('tabBarData', val => {
            this.updateInkBar();
        });
    },
    template: `
        <div style="{{tabBarPosition === 'left' || tabBarPosition === 'right' ? 'height:100%;float:' + tabBarPosition : ''}}">
        <slot name="tab" />
            <div
                role="tablist"
                class="{{classes}}"
                tabIndex="0"
                on-keydown="handleKeyDown"
                s-ref="root"
            >
                <div
                    class="${prefixCls}-extra-content"
                    style="{{tabBarPosition === 'top' || tabBarPosition === 'bottom' ? 'float: right' : ''}}"
                >
                    <template s-if="type === 'editable-card' && !hideAdd">
                        <s-icon type="plus" class="${prefixCls}-new-tab" on-click="handleCreateNewTab" />
                        <slot name="tabBarExtraContent" />
                    </template>
                    <slot name="tabBarExtraContent" s-else />
                </div>
                <s-scrollabletabbarnode
                    refs="{{refs}}"
                    tabBarPosition="{{tabBarPosition}}"
                >
                    <s-tabbartabsnode
                        tabPanes="{{tabPanes}}"
                        tabBarData="{{tabBarData}}"
                        type="{{type}}"
                        closable="{{closable}}"
                        activeKey="{{activeKey}}"
                        tabBarGutter="{{tabBarGutter}}"
                        tabBarPosition="{{tabBarPosition}}"
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
    `
});
