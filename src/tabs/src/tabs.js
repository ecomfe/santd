/**
 * @file Santd tabs source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import TabPane from './tabPane';
import KeyCode from '../../core/util/keyCode';
import {classCreator} from '../../core/util';
import ScrollableInkTabBar from './scrollableInkTabBar';
import TabContent from './tabContent';

const prefixCls = classCreator('tabs')();

const Tabs = san.defineComponent({
    dataTypes: {
        destroyInactiveTabPane: DataTypes.bool,
        tabBarPosition: DataTypes.string,
        activeKey: DataTypes.string,
        defaultActiveKey: DataTypes.string
    },
    initData() {
        return {
            destroyInactiveTabPane: false,
            tabBarPosition: 'top',
            children: []
        };
    },
    inited() {
        this.data.set('activeKey', this.data.get('activeKey') || this.data.get('defaultActiveKey'));
    },
    computed: {
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
    updated() {
        const children = this.data.get('children');
        children.forEach(child => {
            const activeKey = this.data.get('activeKey');
            if (child && !activeKey && !child.data.get('disabled')) {
                this.data.set('activeKey', child.data.get('key'));
            }
        });
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
        this.fire('createNewTab');
    },
    handleRemoveTab(prop) {
        this.fire('removeTab', prop);
    },
    setActiveKey(key) {
        if (this.data.get('activeKey') !== key) {
            this.data.set('activeKey', key);
        }
        this.fire('change', key);
    },
    messages: {
        addTabPane(payload) {
            this.data.set('children', payload.value);
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
        's-tabbar': ScrollableInkTabBar,
        's-tabcontent': TabContent
    },
    template: `
        <div class="${prefixCls} ${prefixCls}-{{tabBarPosition}}">
            <template s-if="tabBarPosition === 'bottom'">
                <s-tabcontent
                    animated="{{hasTabPaneAnimated}}"
                    prefixCls="${prefixCls}"
                    activeKey="{{activeKey}}"
                    destroyInactiveTabPane="{{destroyInactiveTabPane}}"
                    key="tabContent"
                    on-change="setActiveKey"
                    tabBarPosition="{{tabBarPosition}}"
                    type="{{type}}"
                >
                    <slot />
                </s-tabcontent>
                <slot name="renderTabBar" var-props="{{props}}" s-if="hasRenderTabBar" />
                <s-tabbar
                    activeKey="{{activeKey}}"
                    children="{{children}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabBarPosition}}"
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
                    activeKey="{{activeKey}}"
                    children="{{children}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabBarPosition}}"
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
                <s-tabcontent
                    animated="{{hasTabPaneAnimated}}"
                    prefixCls="${prefixCls}"
                    activeKey="{{activeKey}}"
                    destroyInactiveTabPane="{{destroyInactiveTabPane}}"
                    key="tabContent"
                    on-change="setActiveKey"
                    tabBarPosition="{{tabBarPosition}}"
                    type="{{type}}"
                >
                    <slot />
                </s-tabcontent>
            </template>
        </div>
    `
});

Tabs.TabPane = TabPane;
Tabs.TabBar = ScrollableInkTabBar;

export default Tabs;
