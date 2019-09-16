/**
 * @file Santd tabs tab bar tabs node file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Icon from '../../icon';
import {isVertical} from './utils';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    computed: {
        childs() {
            const children = this.data.get('children') || [];
            const activeKey = this.data.get('activeKey');
            const tabBarGutter = this.data.get('tabBarGutter');
            const tabBarPosition = this.data.get('tabBarPosition');

            return children.map((child, index) => {
                const key = child.data.get('key');
                const closable = child.data.get('closable');
                const gutter = tabBarGutter && index === children.length - 1 ? 0 : tabBarGutter;
                const style = gutter !== undefined && {
                    [isVertical(tabBarPosition) ? 'margin-bottom' : 'margin-right']: gutter + 'px'
                };
                let classArr = [`${prefixCls}-tab`];
                activeKey === key && classArr.push(`${prefixCls}-tab-active`);
                child.data.get('disabled') && classArr.push(`${prefixCls}-tab-disabled`);
                return {
                    key: key,
                    className: classArr.join(' '),
                    tab: child.data.get('tab'),
                    style: style,
                    closable: closable
                };
            });
        }
    },
    updated() {
        const nodes = this.children[1].children;
        const activeKey = this.data.get('activeKey');
        const childs = this.data.get('childs');
        childs.forEach((child, index) => {
            if (child.key === activeKey) {
                this.dispatch('addRef', {
                    name: 'activeTab',
                    ref: nodes[index].el
                });
            }
        });
    },
    handleTabClick(e, key) {
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
                s-for="child, index in childs trackBy index"
                role="tab"
                aria-disabled="{{child.disabled ? true : false}}"
                aria-selected="{{activeKey === child.key ? true : false}}"
                class="{{child.className}}"
                key="{{child.key}}"
                index="{{index}}"
                style="{{child.style}}"
                on-click="handleTabClick($event, child.key)"
            >
                <div class="{{child.closable ? '${prefixCls}-tab-uncloseable' : ''}}" s-if="type === 'editable-card'">
                    {{child.tab}}
                    <s-icon
                        type="close"
                        class="${prefixCls}-close-x"
                        s-if="child.closable === undefined ? true : child.closable"
                        on-click="handleRemoveTab(child.key, $event)"
                    />
                </div>
                <template s-else>
                    {{child.tab}}
                </template>
            </div>
        </div>
    `
});
