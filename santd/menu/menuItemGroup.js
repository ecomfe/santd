/**
* @file menuItemGroup component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('menu-item-group')();

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
            return [`${newPrefixCls}-title`];
        },
        classList() {
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-item-group` : `${prefixCls}`;
            return [`${newPrefixCls}-list`];
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
        const key = this.data.get('key') || '';
        const title = this.data.get('title');
        // 处理传入的组件
        if (title && typeof title === 'function') {
            const TitleIcon = title();
            const renderer = new TitleIcon({
                data: {
                    key
                }
            });
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
