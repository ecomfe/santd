/**
 * @file Santd tabs source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import TabPane from './TabPane';
import KeyCode from '../core/util/keyCode';
import {classCreator} from '../core/util';
import ScrollableInkTabBar from './ScrollableInkTabBar';

import './style/index';

const prefixCls = classCreator('tabs')();

const Tabs = san.defineComponent({
    dataTypes: {
        activeKey: DataTypes.string,
        defaultActiveKey: DataTypes.string,
        hideAdd: DataTypes.bool,
        tabBarStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        type: DataTypes.oneOf(['line', 'card', 'editable-card']),
        tabPosition: DataTypes.oneOf(['top', 'right', 'bottom', 'left']),
        size: DataTypes.oneOf(['large', 'default', 'small']),
        animated: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        tabBarGutter: DataTypes.number,
        centered: DataTypes.bool,
        keyboard: DataTypes.bool
    },
    initData() {
        return {
            type: 'line',
            hideAdd: false,
            tabPosition: 'top',
            children: [],
            centered: false,
            keyboard: true
        };
    },
    inited() {
        this.data.set('__activeKey__', this.data.get('activeKey') || this.data.get('defaultActiveKey'));
        this.data.set('hasRenderTabBar', !!this.sourceSlots.named.renderTabBar);
        this.data.set('hasExtraContent', !!this.sourceSlots.named.tabBarExtraContent);
        this.data.set('hasAddIcon', !!this.sourceSlots.named.addIcon);
        this.data.set('ownerData', this.owner.data.get());
        this.tabPanes = [];
        this.data.set('ownerData', this.owner.data.get());
    },
    computed: {
        classes() {
            const tabPosition = this.data.get('tabPosition');
            const size = this.data.get('size');
            const type = this.data.get('type');
            const centered = this.data.get('centered');
            let classArr = [`${prefixCls}`, `${prefixCls}-${type}`, `${prefixCls}-${tabPosition}`];

            (tabPosition === 'left' || tabPosition === 'right') && classArr.push(`${prefixCls}-vertical`);
            !!size && classArr.push(`${prefixCls}-${size}`);
            type.indexOf('card') >= 0 && classArr.push(`${prefixCls}-card`);
            centered && classArr.push(`${prefixCls}-center`);

            return classArr.join(' ');
        },
        contentClasses() {
            const animated = this.data.get('hasAnimated').tabPane;
            const tabPosition = this.data.get('tabPosition');
            const type = this.data.get('type') || '';

            let classArr = [`${prefixCls}-content`, `${prefixCls}-${tabPosition}-content`];
            type.indexOf('card') >= 0 && classArr.push(prefixCls + '-card-content');
            animated
                ? classArr.push(`${prefixCls}-content-animated`)
                : classArr.push(`${prefixCls}-content-no-animated`);
            return classArr;
        },
        hasAnimated() {
            const animated = this.data.get('animated');

            return typeof animated === 'object' ? animated : {tabPane: animated, inkBar: animated};
        },
        props() {
            const activeKey = this.data.get('__activeKey__');
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabPosition = this.data.get('tabPosition');
            const type = this.data.get('type');
            const size = this.data.get('size');
            const tabBarData = this.data.get('tabBarData');
            return {
                activeKey,
                tabBarGutter,
                tabPosition,
                type,
                size,
                tabBarData
            };
        }
    },
    getNextActiveKey(next) {
        const {__activeKey__, tabBarData} = this.data.get();
        const arr = tabBarData.filter(item => !item.disabled);
        const len = arr.length;
        let ret = __activeKey__;
        let currentIndex = arr.findIndex(item => item.key === __activeKey__);

        if (currentIndex > -1) {
            next ? ++currentIndex : --currentIndex;
            if (currentIndex < 0) {
                currentIndex = len - 1;
            }
            if (currentIndex > len - 1) {
                currentIndex = 0;
            }

            ret = arr[currentIndex].key;
        }
        return ret;
    },
    handleTabClick(payload) {
        this.fire('tabClick', payload.key);
        this.setActiveKey(payload.key);
    },
    handleNavKeyDown(e) {
        if (!this.data.get('keyboard')) {
            return;
        }
        const eventKeyCode = e.keyCode;
        if (eventKeyCode === KeyCode.ARROW_RIGHT || eventKeyCode === KeyCode.ARROW_DOWN) {
            e.preventDefault();
            const nextKey = this.getNextActiveKey(true);
            this.setActiveKey(nextKey);
        }
        else if (eventKeyCode === KeyCode.ARROW_LEFT || eventKeyCode === KeyCode.ARROW_UP) {
            e.preventDefault();
            const previousKey = this.getNextActiveKey(false);
            this.setActiveKey(previousKey);
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
        const {__activeKey__} = this.data.get();
        if (__activeKey__ !== key) {
            this.data.set('__activeKey__', key);
            this.updateTab();
            this.fire('change', key);
        }
    },
    updateTab() {
        const __activeKey__ = this.data.get('__activeKey__');
        let tabBarData = [];
        this.tabPanes.forEach(tabPane => {
            const key = tabPane.data.get('key');
            tabPane.data.set('active', __activeKey__ === key);
            tabBarData.push(tabPane.data.get());
        });
        this.data.set('tabBarData', tabBarData);
        this.data.set('tabPanes', this.tabPanes);
    },
    attached() {
        this.updateTab();
        this.watch('tabPosition', val => {
            this.nextTick(() => {
                this.updateTab();
            });
        });
        this.watch('activeKey', val => this.setActiveKey(val));
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
        santd_tabs_prevClick(payload) {
            this.fire('prevClick', payload.value);
        },
        santd_tabs_nextClick(payload) {
            this.fire('nextClick', payload.value);
        }
    },
    components: {
        's-tabbar': ScrollableInkTabBar
    },
    template: `
        <div class="{{classes}}"><slot name="tab"/>
            <template s-if="tabPosition === 'bottom'">
                <div class="{{contentClasses}}"><slot /></div>
                <slot name="renderTabBar" var-props="{{props}}" s-if="hasRenderTabBar" />
                <s-tabbar
                    tabPanes="{{tabPanes}}"
                    tabBarData="{{tabBarData}}"
                    activeKey="{{__activeKey__}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabPosition="{{tabPosition}}"
                    hasExtraContent="{{hasExtraContent}}"
                    hasAddIcon="{{hasAddIcon}}"
                    inkBarAnimated="{{hasAnimated.inkBar}}"
                    on-tabClick="handleTabClick"
                    on-keydown="native:handleNavKeyDown"
                    on-createNewTab="handleCreateNewTab"
                    on-removeTab="handleRemoveTab"
                    type="{{type}}"
                    hideAdd="{{hideAdd}}"
                    size="{{size}}"
                    props="{{props}}"
                    ownerData="{{ownerData}}"
                    s-else
                ><slot name="tabBarExtraContent" slot="tabBarExtraContent" />
                <slot name="addIcon" slot="addIcon" /></s-tabbar>
            </template>
            <template s-else>
                <slot name="renderTabBar" var-props="{{props}}" s-if="hasRenderTabBar" />
                <s-tabbar
                    tabPanes="{{tabPanes}}"
                    tabBarData="{{tabBarData}}"
                    activeKey="{{__activeKey__}}"
                    tabBarGutter="{{tabBarGutter}}"
                    tabBarStyle="{{tabBarStyle}}"
                    tabPosition="{{tabPosition}}"
                    hasExtraContent="{{hasExtraContent}}"
                    hasAddIcon="{{hasAddIcon}}"
                    inkBarAnimated="{{hasAnimated.inkBar}}"
                    on-tabClick="handleTabClick"
                    on-keydown="native:handleNavKeyDown"
                    on-createNewTab="handleCreateNewTab"
                    on-removeTab="handleRemoveTab"
                    type="{{type}}"
                    hideAdd="{{hideAdd}}"
                    size="{{size}}"
                    props="{{props}}"
                    ownerData="{{ownerData}}"
                    s-else
                ><slot name="tabBarExtraContent" slot="tabBarExtraContent" />
                <slot name="addIcon" slot="addIcon" /></s-tabbar>
                <div class="{{contentClasses}}"><slot /></div>
            </template>
        </div>
    `
});

Tabs.TabPane = TabPane;
Tabs.TabBar = ScrollableInkTabBar;

export default Tabs;
