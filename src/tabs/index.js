/**
 * @file 组件 tabs
 * @author panming <panming@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Tabs, {TabPane} from './src/index';
import './style/index.less';

const prefixCls = classCreator('tabs')();

const SanTabs = san.defineComponent({
    autoFillStyleAndId: false,
    dataTypes: {
        activeKey: DataTypes.string,
        defaultActiveKey: DataTypes.string,
        hideAdd: DataTypes.bool,
        tabBarStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        type: DataTypes.oneOf(['line', 'card', 'editable-card']),
        tabPosition: DataTypes.oneOf(['top', 'right', 'bottom', 'left']),
        size: DataTypes.oneOf(['large', 'default', 'small']),
        animated: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        tabBarGutter: DataTypes.number
    },
    initData() {
        return {
            type: 'line',
            hideAdd: false,
            tabPosition: 'top'
        };
    },
    inited() {
        this.data.set('hasRenderTabBar', !!this.sourceSlots.named.renderTabBar);
        this.data.set('hasExtraContent', !!this.sourceSlots.named.tabBarExtraContent);
    },
    computed: {
        classes() {
            const tabPosition = this.data.get('tabPosition');
            const size = this.data.get('size');
            const hasTabPaneAnimated = this.data.get('hasTabPaneAnimated');
            const type = this.data.get('type');
            let classArr = [`${prefixCls}-${type}`];

            (tabPosition === 'left' || tabPosition === 'right') && classArr.push(`${prefixCls}-vertical`);
            !!size && classArr.push(`${prefixCls}-${size}`);
            type.indexOf('card') >= 0 && classArr.push(`${prefixCls}-card`);
            !hasTabPaneAnimated && classArr.push(`${prefixCls}-no-animation`);

            return classArr.join(' ');
        },
        hasTabPaneAnimated() {
            const animated = this.data.get('animated');
            const type = this.data.get('type');

            let tabPaneAnimated = typeof animated === 'object' ? animated.tabPane : animated;
            if (type !== 'line') {
                tabPaneAnimated = typeof animated !== 'undefined' ? tabPaneAnimated : false;
            }
            return tabPaneAnimated;
        }
    },
    handleRemoveTab({key, e}) {
        e.stopPropagation();
        if (!key) {
            return;
        }

        this.fire('edit', {
            action: 'remove',
            key: key
        });
    },
    handleCreateNewTab() {
        this.fire('edit', {
            action: 'add'
        });
    },
    handleChange(key) {
        this.fire('change', key);
    },
    handlePrevClick(e) {
        this.fire('prevClick', e);
    },
    handleNextClick(e) {
        this.fire('nextClick', e);
    },
    handleTabClick(key) {
        this.fire('tabClick', key);
    },
    components: {
        's-tabs': Tabs
    },
    template: `<div>
        <s-tabs
            activeKey="{{activeKey}}"
            defaultActiveKey="{{defaultActiveKey}}"
            tabBarGutter="{{tabBarGutter}}"
            tabBarStyle="{{tabBarStyle}}"
            tabBarPosition="{{tabPosition}}"
            tabPaneAnimated="{{hasTabPaneAnimated}}"
            hasExtraContent="{{hasExtraContent}}"
            hasRenderTabBar="{{hasRenderTabBar}}"
            hideAdd="{{hideAdd}}"
            size="{{size}}"
            type="{{type}}"
            style="{{style}}"
            class="{{classes}}"
            closable="{{closable}}"
            on-createNewTab="handleCreateNewTab"
            on-removeTab="handleRemoveTab"
            on-change="handleChange"
            on-prevClick="handlePrevClick"
            on-nextClick="handleNextClick"
            on-tabClick="handleTabClick"
        >
            <slot name="tabBarExtraContent" slot="tabBarExtraContent" />
            <slot name="renderTabBar" slot="renderTabBar" var-props="{{props}}" />
            <slot />
        </s-tabs>
    </div>`
});

SanTabs.TabPane = TabPane;
SanTabs.TabBar = Tabs.TabBar;

export default SanTabs;
