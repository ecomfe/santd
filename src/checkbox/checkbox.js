/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';

const prefixCls = classCreator('checkbox')();

const Checkbox = san.defineComponent({
    DataTypes: {
        prefixCls: DataTypes.string,
        name: DataTypes.string,
        id: DataTypes.string,
        type: DataTypes.string,
        defaultChecked: DataTypes.oneOfType([DataTypes.number, DataTypes.bool]),
        checked: DataTypes.oneOfType([DataTypes.number, DataTypes.bool]),
        disabled: DataTypes.bool,
        tabIndex: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        readOnly: DataTypes.bool,
        autoFocus: DataTypes.bool,
        value: DataTypes.any
    },

    initData() {
        return {
            prefixCls: 'checkbox',
            type: 'checkbox',
            defaultChecked: false
        };
    },

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
    },

    computed: {
        classes() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');
            let classArr = [prefixCls];

            checked && classArr.push(`${prefixCls}-checked`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    },

    focus() {
        const input = this.ref('input');
        input.focus();
    },

    blur() {
        const input = this.ref('input');
        input.blur();
    },

    handleClick(e) {
        this.fire('click', e);
    },

    handleFocus(e) {
        this.fire('focus', e);
    },

    handleBlur(e) {
        this.fire('blur', e);
    },

    handleChange(e) {
        if (this.data.get('disabled')) {
            return;
        }
        let checked = e.target.checked;
        const type = this.data.get('type');
        if (checked === this.data.get('checked') && type !== 'radio') {
            checked = !checked;
        }
        this.data.set('checked', checked);
        this.fire('change', {
            target: {
                ...this.data.get(),
                checked
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
            nativeEvent: e.nativeEvent
        });
    },

    template: `
        <span class="{{classes}}">
            <input
                name="{{name}}"
                id="{{id}}"
                type="{{type}}"
                readonly="{{readOnly}}"
                disabled="{{disabled}}"
                tabindex="{{tabIndex}}"
                class="{{prefixCls}}-input"
                on-click="handleClick"
                on-focus="handleFocus"
                on-blur="handleBlur"
                on-change="handleChange"
                autofocus="{{autoFocus}}"
                s-ref="input"
                value="{{value}}"
            />
            <span class="{{prefixCls}}-inner" />
        </span>
    `
});

export default san.defineComponent({
    template: `
        <label
            class="{{classes}}"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave"
        >
            <s-checkbox
                prefixCls="${prefixCls}"
                type="{{type}}"
                class="{{indeterminate ? '${prefixCls}-indeterminate' : ''}}"
                checked="{{checked}}"
                disabled="{{disabled}}"
                name="{{name}}"
                defaultChecked="{{defaultChecked}}"
                autoFocus="{{autoFocus}}"
                value="{{value}}"
                on-focus="handleFocus"
                on-blur="handleBlur"
                on-click="handleClick"
                on-change="handleChange"
                s-ref="checkbox"
            /><span s-if="hasSlot"><slot /></span>
        </label>
    `,
    
    dataTypes: {
        checked: DataTypes.bool,
        disabled: DataTypes.bool,
        indeterminate: DataTypes.bool
    },

    components: {
        's-checkbox': Checkbox
    },

    initData() {
        return {
            indeterminate: false
        };
    },

    inited() {
        this.data.set('hasSlot', !!this.sourceSlots.noname);
    },

    attached() {
        this.dispatch('santd_checkbox_add', this);
    },

    computed: {
        classes() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');

            let classArr = [`${prefixCls}-wrapper`];
            checked && classArr.push(`${prefixCls}-wrapper-checked`);
            disabled && classArr.push(`${prefixCls}-wrapper-disabled`);

            return classArr;
        }
    },

    handleChange(e) {
        this.fire('change', e);
        this.dispatch('santd_checkbox_toggleOption', {
            value: this.data.get('value')
        });
    },

    handleClick(e) {
        this.fire('click', e);
    },

    handleBlur(e) {
        this.fire('blur', e);
    },

    handleFocus(e) {
        this.fire('focus', e);
    },

    handleMouseEnter(e) {
        this.fire('mouseenter', e);
    },

    handleMouseLeave(e) {
        this.fire('mouseleave', e);
    },

    focus() {
        this.ref('checkbox').focus();
    },

    blur() {
        this.ref('checkbox').blur();
    }
});