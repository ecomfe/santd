/**
 * @file Santd checkbox group file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Checkbox from './checkbox';

const prefixCls = classCreator('checkbox')();

export default san.defineComponent({
    DataTypes: {
        defaultValue: DataTypes.array,
        value: DataTypes.array,
        options: DataTypes.array,
        disabled: DataTypes.bool,
        name: DataTypes.string
    },
    components: {
        's-checkbox': Checkbox
    },
    initData() {
        return {
            prefixCls,
            options: [],
            disabled: false,
            childs: []
        };
    },
    computed: {
        checkboxs() {
            const options = this.data.get('options');
            const value = this.data.get('value') || [];
            return options.map(option => {
                if (typeof option === 'string') {
                    option = {
                        label: option,
                        value: option
                    };
                }
                option.key = option.value.toString();
                option.disabled = 'disabled' in option ? option.disabled : this.data.get('disabled');
                option.checked = value.indexOf(option.value) !== -1;
                return option;
            });
        }
    },
    inited() {
        const value = this.data.get('value') || this.data.get('defaultValue') || [];
        this.data.set('instance', this);
        this.data.set('value', value);
    },
    updated() {
        const childs = this.data.get('childs');
        const value = this.data.get('value') || [];
        childs.length && childs.forEach(child => {
            child.data.set('checked', value.indexOf(child.data.get('value')) !== -1);
            child.data.set('disabled', 'disabled' in child.data.get()
                ? child.data.get('disabled') : this.data.get('disabled'));
            child.data.set('name', this.data.get('name'));
        });
    },
    messages: {
        santd_checkbox_toggleOption(payload) {
            const option = payload.value;
            const value = this.data.get('value') || [];
            const optionIndex = value.indexOf(option.value);
            if (optionIndex === -1) {
                value.push(option.value);
            }
            else {
                value.splice(optionIndex, 1);
            }
            this.data.set('value', value);
            this.fire('change', value);
            // 提交数据给form表单使用
            this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
        },
        santd_checkbox_add(payload) {
            const checkboxs = this.data.get('checkboxs');
            // 当没有options数据的时候才去收集子checkbox
            if (!checkboxs.length) {
                this.data.push('childs', payload.value);
            }
        }
    },
    template: `
        <div class="{{prefixCls}} {{className}}" style="{{style}}">
            <s-checkbox
                s-if="{{checkboxs.length}}"
                s-for="checkbox in checkboxs"
                prefixCls="{{prefixCls}}"
                key="{{checkbox.key}}"
                disabled="{{checkbox.disabled}}"
                value="{{checkbox.value}}"
                checked="{{checkbox.checked}}"
                className="{{prefixCls}}-group-item"
                name="{{name}}"
            >{{checkbox.label}}</s-checkbox>
            <slot></slot>
        </div>
    `
});
