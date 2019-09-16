/**
 * @file Santd tabs scrollable ink tab bar file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../../icon';
import ScrollableTabBarNode from './scrollableTabBarNode';
import TabBarTabsNode from './tabBarTabsNode';
import InkTabBarNode from './inkTabBarNode';
import {classCreator} from '../../core/util';
const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    components: {
        's-scrollabletabbarnode': ScrollableTabBarNode,
        's-tabbartabsnode': TabBarTabsNode,
        's-inktabbarnode': InkTabBarNode,
        's-icon': Icon
    },
    initData() {
        return {
            tabBarPosition: 'top',
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
        addRef(payload) {
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
    attached() {
        this.data.set('refs.root', this.ref('root'));
    },
    template: `
        <div style="{{tabBarPosition === 'left' || tabBarPosition === 'right' ? 'height:100%;float:' + tabBarPosition : ''}}">
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
                        type="{{type}}"
                        closable="{{closable}}"
                        children="{{children}}"
                        activeKey="{{activeKey}}"
                        tabBarGutter="{{tabBarGutter}}"
                        tabBarPosition="{{tabBarPosition}}"
                        on-tabClick="handleTabClick"
                        on-removeTab="handleRemoveTab"
                    ></s-tabbartabsnode>
                    <s-inktabbarnode
                        refs="{{refs}}"
                        tabBarPosition="{{tabBarPosition}}"
                    ></s-inktabbarnode>
                </s-scrollabletabbarnode>
            </div>
        </div>
    `
});
