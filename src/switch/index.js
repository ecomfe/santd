/**
 * @file 组件 switch
 * @author panming <panming@baidu.com>
 */

import san, {DataTypes} from 'san';
import Icon from '../icon';
import {classCreator} from '../core/util';
import './style/index.less';
const prefixCls = classCreator('switch')();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        checkedChildren: DataTypes.string,
        unCheckedChildren: DataTypes.string,
        checked: DataTypes.bool,
        defaultChecked: DataTypes.bool,
        autoFocus: DataTypes.bool,
        loading: DataTypes.bool,
        tabIndex: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },

    components: {
        's-icon': Icon
    },

    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'small'
            },
            disabled: false,
            defaultChecked: false,
            checked: false,
            loading: false
        };
    },

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
    },

    computed: {
        classes() {
            const data = this.data;
            const checked = data.get('checked');
            const disabled = data.get('disabled');
            const size = data.get('sizeMap')[data.get('size')];
            const loading = data.get('loading');
            const block = data.get('block');
            let classArr = [prefixCls];

            !!checked && classArr.push(`${prefixCls}-checked`);
            !!disabled && classArr.push(`${prefixCls}-disabled`);
            !!size && classArr.push(`${prefixCls}-${size}`);
            !!loading && classArr.push(`${prefixCls}-loading`);
            !!block && classArr.push(`${prefixCls}-block`);
            return classArr;
        }
    },

    attached() {
        this.nextTick(() => {
            const autoFocus = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            if (autoFocus && !disabled) {
                this.focus();
            }
        });
    },

    setChecked(checked) {
        if (this.data.get('disabled')) {
            return;
        }
        if (!this.data.get('disabled')) {
            this.data.set('checked', checked);
        }
        this.fire('change', checked);
        this.dispatch('UI:form-item-interact', {fieldValue: checked, type: 'change'});
    },

    toggle() {
        const checked = !this.data.get('checked');
        this.setChecked(checked);
        this.fire('click', checked);
    },

    handleKeyDown(e) {
        if (e.keyCode === 37) { // Left
            this.setChecked(false);
        }
        else if (e.keyCode === 39) { // Right
            this.setChecked(true);
        }
        else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
            this.toggle();
        }
    },

    focus() {
        this.el.focus();
    },

    blur() {
        this.el.blur();
    },

    handleMouseUp(e) {
        this.el.blur();
        this.fire('mouseup', e);
    },

    template: `
        <span
            disabled="{{disabled}}"
            class="{{classes}}"
            on-click="toggle"
            on-keydown="handleKeyDown"
            on-mouseUp="handleMouseUp"
            tabIndex="{{disabled ? -1 : tabIndex || 0}}"
        >
            <span class="${prefixCls}-handler" s-if="{{loading}}">
                <s-icon type="loading" />
            </span>
            <span class="${prefixCls}-inner">
                <template s-if="checked && checkedChildren">{{checkedChildren}}</template>
                <slot name="checkedChildren" s-else-if="checked" />
                <template s-if="!checked && unCheckedChildren">{{unCheckedChildren}}</template>
                <slot name="unCheckedChildren" s-else-if="!checked" />
            </span>
        </span>
    `
});
