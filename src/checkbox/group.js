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
            options: [],
            disabled: false
        };
    },

    computed: {
        checkboxs() {
            const options = this.data.get('options');
            const value = this.data.get('value') || [];
            const disabled = this.data.get('disabled');

            return options.map(option => {
                if (typeof option === 'string') {
                    option = {
                        label: option,
                        value: option
                    };
                }

                option.disabled = option.disabled != null ? option.disabled : disabled;
                option.checked = value.indexOf(option.value) !== -1;
                return option;
            });
        }
    },

    inited() {
        this.checkboxs = [];
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || []);
    },

    disposed() {
        this.checkboxs = null;
    },

    updated() {
        const value = this.data.get('value') || [];
        this.checkboxs.forEach(child => {
            child.data.set('checked', value.indexOf(child.data.get('value')) !== -1);
            child.data.set('disabled', child.data.get('disabled') || this.data.get('disabled'));
            child.data.set('name', this.data.get('name'));
        });
    },

    messages: {
        santd_checkbox_toggleOption(payload) {
            const option = payload.value;
            const optionIndex = this.data.get('value').indexOf(option.value);
            if (optionIndex === -1) {
                this.data.push('value', option.value);
            }
            else {
                this.data.removeAt('value', optionIndex);
            }

            // 这里跟ant保持一致，返回包含所有数据的数组
            this.fire('change', this.data.get('value'));
            // 提交数据给form表单使用
            this.dispatch('UI:form-item-interact', {
                fieldValue: this.data.get('value'),
                type: 'change',
                e: payload.value.e
            });
        },

        santd_checkbox_add(payload) {
            // 当没有options数据的时候才去收集子checkbox
            if (!this.data.get('checkboxs').length) {
                this.checkboxs.push(payload.value);
            }
        }
    },

    template: `
        <div class="${prefixCls}">
            <s-checkbox
                s-if="checkboxs.length"
                s-for="checkbox in checkboxs"
                disabled="{{checkbox.disabled}}"
                value="{{checkbox.value}}"
                checked="{{checkbox.checked}}"
                class="${prefixCls}-group-item"
                name="{{name}}"
            >{{checkbox.label}}</s-checkbox>
            <slot />
        </div>
    `
});
