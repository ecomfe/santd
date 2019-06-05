/**
* @file menuItemGroup component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {classCreator} from 'santd/core/util';
import {findComponentsLevel, findComponentUpward} from 'santd/core/util/findCompont';
const pagin = classCreator('menu-item-group');
const prefixCls = pagin();
export default san.defineComponent({
    dataTypes: {
        title: DataTypes.any
    },
    computed: {
        styles() {
            const inlineIndent = this.data.get('inlineIndent');
            if (this.data.get('mode') === 'inline' && !this.data.get('inlineCollapsed')) {
                const levels = this.data.get('level');
                return {'padding-left': inlineIndent + levels * inlineIndent + 'px'};
            }
        },
        newTitle() {
            const title = this.data.get('title');
            if (typeof title === 'string') {
                return title;
            }
            return '';
        },
        classTitle() {
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-item-group` : `${prefixCls}`;
            return classNames({
                [`${newPrefixCls}-title`]: true
            });
        },
        classList() {
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-item-group` : `${prefixCls}`;
            return classNames({
                [`${newPrefixCls}-list`]: true
            });
        }
    },
    initData() {
        return {
            componentPropName: 's-menu-item-group',
            inlineIndent: 24
        };
    },
    attached() {
        // 将menuItemGroup 传到menu
        this.dispatch('itemGroupRender', this);
        const title = this.data.get('title');
        // 处理传入组件Icon
        if (title && typeof title === 'function') {
            const TitleIcon = title();
            const renderer = new TitleIcon();
            renderer.attach(this.ref('itemGroupTitle'));
            renderer.parentComponent = this;
        }
    },
    itemGroupClick(e) {
        e.stopPropagation();
    },

    template: `
        <li class="${prefixCls}" on-click="itemGroupClick($event)">
            <div
                class="{{classTitle}}"
                style="{{styles}}"
                s-ref="itemGroupTitle"
            >{{newTitle}}</div>
            <ul class="{{classList}}">
                <slot></slot>
            </ul>
        </li>
    `
});
