/**
 * @file Santd tabs source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import TabPane from './tabPane';
import KeyCode from '../../core/util/keyCode';

const Tabs = san.defineComponent({
    dataTypes: {
        destroyInactiveTabPane: DataTypes.bool,
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        tabBarPosition: DataTypes.string,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        activeKey: DataTypes.string,
        defaultActiveKey: DataTypes.string
    },
    initData() {
        return {
            prefixCls: 'tabs',
            destroyInactiveTabPane: false,
            tabBarPosition: 'top',
            children: []
        };
    },
    inited() {
        let activeKey = this.data.get('activeKey');
        let defaultActiveKey = this.data.get('defaultActiveKey');

        this.data.set('activeKey', activeKey || defaultActiveKey);
    },
    compiled() {
        const parent = this.parentComponent;
        const defaultRenderTabBar = parent.data.get('defaultRenderTabBar');
        const renderTabBar = parent.data.get('renderTabBar');
        let tabBar;
        if (renderTabBar) {
            tabBar = renderTabBar.bind(parent)(defaultRenderTabBar.bind(parent)(), parent.data.get());
        }
        else {
            tabBar = defaultRenderTabBar.bind(parent)();
        }
        const renderTabContent = parent.data.get('defaultRenderTabContent');
        const tabContent = renderTabContent.bind(parent)();

        this.components['s-tabbar'] = tabBar;
        this.components['s-tabcontent'] = tabContent;
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const tabBarPosition = this.data.get('tabBarPosition');
            const className = this.data.get('className');
            return [`${prefixCls}`, `${prefixCls}-${tabBarPosition}`, className];
        },
        props() {
            const prefixCls = this.data.get('prefixCls');
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
    template: `
        <div
            class="{{classes}}"
        >
            <template s-if="tabBarPosition === 'bottom'">
                <s-tabcontent
                    animated="{{hasTabPaneAnimated}}"
                    prefixCls="{{prefixCls}}"
                    activeKey="{{activeKey}}"
                    destroyInactiveTabPane="{{destroyInactiveTabPane}}"
                    key="tabContent"
                    on-change="setActiveKey"
                    tabBarPosition="{{tabBarPosition}}"
                    type="{{type}}"
                >
                    <slot></slot>
                </s-tabcontent>
                <s-tabbar
                    prefixCls="{{prefixCls}}"
                    activeKey="{{activeKey}}"
                    children="{{children}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabBarPosition}}"
                    on-keydown="native:handleNavKeyDown"
                    type="{{type}}"
                    size="{{size}}"
                    tabBarExtraContent="{{tabBarExtraContent}}"
                    injectComponent="{{injectComponent}}"
                    props="{{props}}"
                ></s-tabbar>
            </template>
            <template s-else>
                <s-tabbar
                    prefixCls="{{prefixCls}}"
                    activeKey="{{activeKey}}"
                    children="{{children}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabBarPosition="{{tabBarPosition}}"
                    on-keydown="native:handleNavKeyDown"
                    type="{{type}}"
                    size="{{size}}"
                    tabBarExtraContent="{{tabBarExtraContent}}"
                    injectComponent="{{injectComponent}}"
                    props="{{props}}"
                ></s-tabbar>
                <s-tabcontent
                    animated="{{hasTabPaneAnimated}}"
                    prefixCls="{{prefixCls}}"
                    activeKey="{{activeKey}}"
                    destroyInactiveTabPane="{{destroyInactiveTabPane}}"
                    key="tabContent"
                    on-change="setActiveKey"
                    tabBarPosition="{{tabBarPosition}}"
                    type="{{type}}"
                >
                    <slot></slot>
                </s-tabcontent>
            </template>
        </div>
    `
});

Tabs.TabPane = TabPane;

export default Tabs;
