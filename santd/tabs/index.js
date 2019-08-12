/**
 * @file 组件 tabs
 * @author panming <panming@baidu.com>
 */

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import Icon from '../icon';
import {classCreator} from '../core/util';
import tabs, {TabPane, TabContent} from './src/index';
import scrollableInkTabBar from './src/scrollableInkTabBar';
import './style/index.less';

const prefixCls = classCreator('tabs')();

const prevIcon = san.defineComponent({
    computed: {
        prevIconType() {
            const tabPosition = this.data.get('tabPosition');
            const isVertical = tabPosition === 'left' || tabPosition === 'right';

            return isVertical ? 'up' : 'left';
        }
    },
    components: {
        's-icon': Icon
    },
    template: `<span class="{{prefixCls}}-tab-prev-icon">
        <s-icon type="{{prevIconType}}" class="{{prefixCls}}-tab-prev-icon-target"/>
    </span>`
});

const nextIcon = san.defineComponent({
    computed: {
        nextIconType() {
            const tabPosition = this.data.get('tabPosition');
            const isVertical = tabPosition === 'left' || tabPosition === 'right';

            return isVertical ? 'down' : 'right';
        }
    },
    components: {
        's-icon': Icon
    },
    template: `<span class="{{prefixCls}}-tab-next-icon">
        <s-icon type="{{nextIconType}}" class="{{prefixCls}}-tab-next-icon-target"/>
    </span>`
});

const Tabs = san.defineComponent({
    dataTypes: {
        activeKey: DataTypes.string,
        defaultActiveKey: DataTypes.string,
        hideAdd: DataTypes.bool,
        tabBarStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        type: DataTypes.oneOf(['line', 'card', 'editable-card']),
        tabPosition: DataTypes.oneOf(['top', 'right', 'bottom', 'left']),
        size: DataTypes.oneOf(['large', 'default', 'small']),
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        animated: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        tabBarGutter: DataTypes.number,
        renderTabBar: DataTypes.func,
        renderTabContent: DataTypes.func,
        tabBarExtraContent: DataTypes.func
    },
    initData() {
        return {
            type: 'line',
            hideAdd: false,
            tabPosition: 'top',
            prefixCls: prefixCls,
            defaultRenderTabBar() {
                const tabBar = san.defineComponent({
                    initData() {
                        return {
                            ...scrollableInkTabBar.prototype.initData(),
                            prevIcon,
                            nextIcon
                        };
                    },
                    computed: {
                        ...scrollableInkTabBar.prototype.computed,
                        className() {
                            const tabPosition = this.data.get('tabBarPosition');
                            const size = this.data.get('size');
                            const type = this.data.get('type');
                            return classNames(`${prefixCls}-${tabPosition}-bar`, {
                                [`${prefixCls}-${size}-bar`]: !!size,
                                [`${prefixCls}-card-bar`]: type && type.indexOf('card') >= 0
                            });
                        }
                    }
                });

                san.inherits(tabBar, scrollableInkTabBar);
                return tabBar;
            },
            defaultRenderTabContent() {
                const hasTabPaneAnimated = this.data.get('hasTabPaneAnimated');
                const newTabContent = san.defineComponent({
                    initData() {
                        return {
                            ...TabContent.prototype.initData(),
                            hasTabPaneAnimated: hasTabPaneAnimated,
                            animatedWithMargin: true
                        };
                    },
                    computed: {
                        ...TabContent.prototype.computed,
                        className() {
                            const tabPosition = this.data.get('tabBarPosition');
                            const type = this.data.get('type') || '';
                            return classNames(
                                `${prefixCls}-${tabPosition}-content`,
                                type.indexOf('card') >= 0 && prefixCls + '-card-content'
                            );
                        }
                    }
                });
                san.inherits(newTabContent, TabContent);
                return newTabContent;
            },
            injectComponent(tab) {
                const type = this.data.get('type');
                const that = this;
                if (type === 'editable-card') {
                    return san.defineComponent({
                        components: {
                            tabnode: typeof tab === 'function' ? tab : '',
                            icon: Icon
                        },
                        inited() {
                            this.data.set('instance', this);
                        },
                        computed: {
                            classes() {
                                const closable = this.data.get('closable');
                                return classNames({
                                    [`${prefixCls}-tab-uncloseable`]: !closable
                                });
                            },
                            isComponent() {
                                const instance = this.data.get('instance');
                                const tabNode = instance && instance.components.tabnode;
                                return tabNode && typeof tabNode === 'function';
                            }
                        },
                        handleRemoveTab(e) {
                            const key = this.data.get('key');
                            that.handleRemoveTab(key, e);
                        },
                        template: `
                            <div class="{{classes}}">
                                <tabnode s-if="isComponent"></tabnode>
                                <template s-else>{{tab}}</template>
                                <icon
                                    type="close"
                                    class="${prefixCls}-close-x"
                                    s-if="closable === undefined ? true : closable"
                                    on-click="handleRemoveTab($event)"
                                ></icon>
                            </div>
                        `
                    });
                }
            }
        };
    },
    inited() {
        const injectComponent = this.data.get('injectComponent');
        const hideAdd = this.data.get('hideAdd');
        const type = this.data.get('type');
        this.data.set('injectComponent', injectComponent.bind(this));
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});

        let tabBarExtraContent;
        const that = this;
        if (type === 'editable-card' && !hideAdd) {
            tabBarExtraContent = this.data.get('tabBarExtraContent');
            const extraContent = san.defineComponent({
                components: {
                    'icon': Icon,
                    'extra': tabBarExtraContent
                },
                handleCreateNewTab(e) {
                    that.handleCreateNewTab(e);
                },
                template: `
                    <span>
                        <icon type="plus" class="${prefixCls}-new-tab" on-click="handleCreateNewTab"/>
                        <extra></extra>
                    </span>
                `
            });
            tabBarExtraContent = extraContent;
        }
        if (tabBarExtraContent) {
            this.data.set('tabBarExtraContent', san.defineComponent({
                components: {
                    extra: tabBarExtraContent
                },
                template: `
                    <div class="${prefixCls}-extra-content">
                        <extra></extra>
                    </div>
                `
            }));
        }
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const tabPosition = this.data.get('tabPosition');
            const size = this.data.get('size');
            const hasTabPaneAnimated = this.data.get('hasTabPaneAnimated');
            const type = this.data.get('type');

            return classNames(className, {
                [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
                [`${prefixCls}-${size}`]: !!size,
                [`${prefixCls}-card`]: type.indexOf('card') >= 0,
                [`${prefixCls}-${type}`]: true,
                [`${prefixCls}-no-animation`]: !hasTabPaneAnimated
            });
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
    handleRemoveTab(key, e) {
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
        's-tabs': tabs
    },
    template: `<div>
        <s-tabs
            activeKey="{{activeKey}}"
            defaultActiveKey="{{defaultActiveKey}}"
            tabBarGutter="{{tabBarGutter}}"
            tabBarStyle="{{tabBarStyle}}"
            tabBarPosition="{{tabPosition}}"
            prefixCls="{{prefixCls}}"
            className="{{classes}}"
            tabPaneAnimated="{{hasTabPaneAnimated}}"
            tabBarExtraContent="{{tabBarExtraContent}}"
            size="{{size}}"
            type="{{type}}"
            injectComponent="{{injectComponent}}"
            style="{{bodyStyle}}"
            on-change="handleChange"
            on-prevClick="handlePrevClick"
            on-nextClick="handleNextClick"
            on-tabClick="handleTabClick"
        >
            <slot></slot>
        </s-tabs>
    </div>`
});

Tabs.TabPane = TabPane;

export default Tabs;
