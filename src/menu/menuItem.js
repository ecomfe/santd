/**
* @file menuItem component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import {findComponentsLevel} from '../core/util/findCompont';
const prefixCls = classCreator('menu-item')();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        key: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        title: DataTypes.string,
        multiple: DataTypes.bool,
        selectable: DataTypes.bool
    },
    computed: {
        classes() {
            const menuSelectedKeys = this.data.get('selectedKeys') || [];
            const key = this.data.get('key');
            let selected = false;
            const prefix = this.data.get('prefixCls');
            const disabled = this.data.get('disabled');
            const newPrefixCls = prefix ? `${prefix}-menu-item` : `${prefixCls}`;
            menuSelectedKeys.forEach(defKey => {
                if (defKey === key) {
                    selected = true;
                }
            });
            let classArr = [newPrefixCls];
            selected && classArr.push(`${newPrefixCls}-selected`);
            disabled && classArr.push(`${newPrefixCls}-disabled`);
            return classArr;
        },
        styles() {
            const inlineIndent = this.data.get('inlineIndent');
            if (this.data.get('mode') === 'inline' && !this.data.get('inlineCollapsed')) {
                const levels = this.data.get('level');
                return {'padding-left': inlineIndent + levels * inlineIndent + 'px'};
            }
        }

    },
    inited() {
        const parentComponent = this.parentComponent;
        const prefixCls = this.data.get('prefixCls');
        this.data.set('prefixCls', parentComponent.data.get('prefixCls') || prefixCls);
    },
    initData() {
        return {
            componentPropName: 's-menu-item',
            inlineIndent: 24,
            multiple: false,
            selectable: true
        };
    },
    attached() {
        // 把menuItem组件传到 Menu 保存
        this.dispatch('itemRender', this);
        // 获取组件所在层级 level
        const level = findComponentsLevel(this, 's-sub-menu').length;
        this.data.set('level', level);
    },
    onClick(e) {
        e.stopPropagation();
        const {key, disabled, selectable} = this.data.get();
        if (disabled || !selectable) {
            return false;
        }
        const resSub = findComponentsLevel(this, 's-sub-menu');
        const parentKeys = resSub.map(sub => {
            return sub.data.get('key');
        });
        parentKeys.unshift(key);
        this.dispatch('itemClick', {key: key, item: this, keyPath: parentKeys});
    },
    messages: {

    },
    template: `
        <li
            class="{{classes}}"
            style="{{styles}}"
            on-click="onClick($event)"
        >
            <slot></slot>
        </li>
    `
});
