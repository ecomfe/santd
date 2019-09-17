/**
 * @file Santd tabs tab bar tabs node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../icon';
import {isVertical} from './utils';
import {classCreator} from '../core/util';

const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    computed: {
        tabBars() {
            let tabBarData = this.data.get('tabBarData') || [];
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabBarPosition = this.data.get('tabBarPosition');

            return tabBarData.map((tabBar, index) => {
                const gutter = tabBarGutter && index === tabBarData.length - 1 ? 0 : tabBarGutter;
                const style = gutter !== undefined && {[isVertical(tabBarPosition) ? 'margin-bottom' : 'margin-right']: gutter + 'px'};
                let classArr = [`${prefixCls}-tab`];
                tabBar.active && classArr.push(`${prefixCls}-tab-active`);
                tabBar.disabled && classArr.push(`${prefixCls}-tab-disabled`);

                return {
                    ...tabBar,
                    classes: classArr,
                    style: style
                };
            });
        }
    },
    handleTabClick(e, key, disabled) {
        if (disabled) {
            return;
        }
        this.dispatch('tabClick', {key, e});
        this.fire('tabClick', {key, e});
    },
    handleRemoveTab(key, e) {
        e.stopPropagation();
        this.fire('removeTab', {key, e});
    },
    attached() {
        this.dispatch('addRef', {
            name: 'navTabsContainer',
            ref: this.el
        });
    },
    components: {
        's-icon': Icon
    },
    template: `
        <div>
            <div
                s-for="tabBar, index in tabBars trackBy index"
                role="tab"
                aria-disabled="{{tabBar.disabled ? true : false}}"
                aria-selected="{{tabBar.active ? true : false}}"
                class="{{tabBar.classes}}"
                index="{{index}}"
                style="{{tabBar.style}}"
                on-click="handleTabClick($event, tabBar.key, tabBar.disabled)"
            >
                <div class="{{tabBar.closable ? '${prefixCls}-tab-uncloseable' : ''}}" s-if="type === 'editable-card'">
                    {{tabBar.tab}}
                    <s-icon
                        type="close"
                        class="${prefixCls}-close-x"
                        s-if="tabBar.closable === undefined ? true : tabBar.closable"
                        on-click="handleRemoveTab(tabBar.key, $event)"
                    />
                </div>
                <template s-else>
                    {{tabBar.tab}}
                </template>
            </div>
        </div>
    `
});
