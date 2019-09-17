/**
 * @file Santd tabs source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import TabPane from './tabPane';
import KeyCode from '../core/util/keyCode';
import {classCreator} from '../core/util';
import ScrollableInkTabBar from './scrollableInkTabBar';
import TabContent from './tabContent';

import './style/index';

const prefixCls = classCreator('tabs')();

const Tabs = san.defineComponent({
    dataTypes: {
        destroyInactiveTabPane: DataTypes.bool,
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
            destroyInactiveTabPane: false,
            tabBarPosition: 'top',
            type: 'line',
            hideAdd: false,
            tabPosition: 'top',
            children: []
        };
    },
    inited() {
        this.data.set('activeKey', this.data.get('activeKey') || this.data.get('defaultActiveKey'));
        this.data.set('hasRenderTabBar', !!this.sourceSlots.named.renderTabBar);
        this.data.set('hasExtraContent', !!this.sourceSlots.named.tabBarExtraContent);
        this.tabPanes = [];
    },
    computed: {
        classes() {
            const tabPosition = this.data.get('tabPosition');
            const size = this.data.get('size');
            const hasTabPaneAnimated = this.data.get('hasTabPaneAnimated');
            const type = this.data.get('type');
            let classArr = [`${prefixCls}`, `${prefixCls}-${type}`, `${prefixCls}-${tabPosition}`];

            (tabPosition === 'left' || tabPosition === 'right') && classArr.push(`${prefixCls}-vertical`);
            !!size && classArr.push(`${prefixCls}-${size}`);
            type.indexOf('card') >= 0 && classArr.push(`${prefixCls}-card`);
            !hasTabPaneAnimated && classArr.push(`${prefixCls}-no-animation`);

            return classArr.join(' ');
        },
        contentClasses() {
            const animated = this.data.get('animated');
            const tabPosition = this.data.get('tabPosition');
            const type = this.data.get('type') || '';

            let classArr = [`${prefixCls}-content`, `${prefixCls}-${tabPosition}-content`];
            type.indexOf('card') >= 0 && classArr.push(prefixCls + '-card-content');
            animated
                ? classArr.push(`${prefixCls}-content-animated`)
                : classArr.push(`${prefixCls}-content-no-animated`);
            return classArr;
        },
        hasTabPaneAnimated() {
            const animated = this.data.get('animated');

            let tabPaneAnimated = typeof animated === 'object' ? animated.tabPane : animated;
            if (this.data.get('type') !== 'line') {
                tabPaneAnimated = typeof animated !== 'undefined' ? tabPaneAnimated : false;
            }
            return tabPaneAnimated;
        },
        props() {
            const activeKey = this.data.get('activeKey');
            const children = this.data.get('children');
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabBarPosition = this.data.get('tabBarPosition');
            const type = this.data.get('type');
            const size = this.data.get('size');
            return {
                prefixCls,
                activeKey,
                children,
                tabBarGutter,
                tabBarPosition,
                type,
                size
            };
        }
    },
    getNextActiveKey(next) {
        const activeKey = this.data.get('activeKey');
        const childs = this.data.get('children');
        const children = [];
        childs.forEach(c => {
            if (c && !c.data.get('disabled')) {
                if (next) {
                    children.push(c);
                } else {
                    children.unshift(c);
                }
            }
        });
        const length = children.length;
        let ret = length && children[0].data.get('key');
        children.forEach((child, i) => {
            if (child.data.get('key') === activeKey) {
                if (i === length - 1) {
                    ret = children[0].data.get('key');
                } else {
                    ret = children[i + 1].data.get('key');
                }
            }
        });
        return ret;
    },
    handleTabClick(payload) {
        this.setActiveKey(payload.key);
        this.updateTab();
        this.fire('tabClick', payload.key);
    },
    handleNavKeyDown(e) {
        const eventKeyCode = e.keyCode;
        if (eventKeyCode === KeyCode.ARROW_RIGHT || eventKeyCode === KeyCode.ARROW_DOWN) {
            e.preventDefault();
            const nextKey = this.getNextActiveKey(true);
            this.handleTabClick({key: nextKey});
        } else if (eventKeyCode === KeyCode.ARROW_LEFT || eventKeyCode === KeyCode.ARROW_UP) {
            e.preventDefault();
            const previousKey = this.getNextActiveKey(false);
            this.handleTabClick({key: previousKey});
        }
    },
    handleCreateNewTab() {
        this.fire('edit', {
            action: 'add'
        });
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
    setActiveKey(key) {
        if (this.data.get('activeKey') !== key) {
            this.data.set('activeKey', key);
        }
        this.fire('change', key);
    },
    updateTab() {
        const activeKey = this.data.get('activeKey');
        let tabBarData = [];
        this.tabPanes.forEach(tabPane => {
            const key = tabPane.data.get('key');
            tabPane.data.set('active', activeKey === key);
            tabBarData.push(tabPane.data.get());
        });
        this.data.set('tabBarData', tabBarData, {force: true});
    },
    attached() {
        this.updateTab();
        this.watch('tabPosition', val => {
            this.nextTick(() => {
                this.updateTab();
            });
        });
    },
    messages: {
        santd_tabs_addTabPane(payload) {
            this.tabPanes.push(payload.value);
            this.updateTab();
        },
        santd_tabs_removeTabPane(payload) {
            this.tabPanes.forEach((tabPane, index) => {
                if (tabPane.data.get('key') === payload.value) {
                    this.tabPanes.splice(index, 1);
                }
            });
            this.updateTab();
        },
        tabClick(payload) {
            this.handleTabClick(payload.value);
        },
        prevClick(payload) {
            this.fire('prevClick', payload.value);
        },
        nextClick(payload) {
            this.fire('nextClick', payload.value);
        }
    },
    components: {
        's-tabbar': ScrollableInkTabBar
    },
    template: `
        <div class="{{classes}}">
            <template s-if="tabPosition === 'bottom'">
                <div class="{{contentClasses}}"><slot /></div>
                <slot name="renderTabBar" var-props="{{props}}" s-if="hasRenderTabBar" />
                <s-tabbar
                    tabBarData="{{tabBarData}}"
                    activeKey="{{activeKey}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabPosition}}"
                    hasExtraContent="{{hasExtraContent}}"
                    on-keydown="native:handleNavKeyDown"
                    on-createNewTab="handleCreateNewTab"
                    on-removeTab="handleRemoveTab"
                    type="{{type}}"
                    closable="{{closable}}"
                    hideAdd="{{hideAdd}}"
                    size="{{size}}"
                    props="{{props}}"
                    s-else
                ><slot name="tabBarExtraContent" slot="tabBarExtraContent" /></s-tabbar>
            </template>
            <template s-else>
                <slot name="renderTabBar" var-props="{{props}}" s-if="hasRenderTabBar" />
                <s-tabbar
                    tabBarData="{{tabBarData}}"
                    activeKey="{{activeKey}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabPosition}}"
                    hasExtraContent="{{hasExtraContent}}"
                    on-keydown="native:handleNavKeyDown"
                    on-createNewTab="handleCreateNewTab"
                    on-removeTab="handleRemoveTab"
                    type="{{type}}"
                    closable="{{closable}}"
                    hideAdd="{{hideAdd}}"
                    size="{{size}}"
                    props="{{props}}"
                    s-else
                ><slot name="tabBarExtraContent" slot="tabBarExtraContent" /></s-tabbar>
                <div class="{{contentClasses}}"><slot /></div>
            </template>
        </div>
    `
});

Tabs.TabPane = TabPane;
Tabs.TabBar = ScrollableInkTabBar;

export default Tabs;
