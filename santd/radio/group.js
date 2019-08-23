/**
 * @file Santd radio group file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Radio from './radio';

const prefixCls = classCreator('radio')();

export default san.defineComponent({
    DataTypes: {
        defaultValue: DataTypes.array,
        value: DataTypes.array,
        options: DataTypes.array,
        disabled: DataTypes.bool,
        name: DataTypes.string
    },
    components: {
        's-radio': Radio
    },
    initData() {
        return {
            prefixCls: prefixCls,
            buttonStyle: 'outline',
            options: [],
            disabled: false,
            childs: []
        };
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const buttonStyle = this.data.get('buttonStyle');
            const size = this.data.get('size');
            const prefix = prefixCls + '-group';
            let classArr = [prefix, `${prefix}-${buttonStyle}`];

            className && classArr.push(className);
            size && classArr.push(`${prefix}-${size}`);
            return classArr;
        },
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
                option.checked = (value === option.value);
                return {
                    ...option
                };
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
        const value = this.data.get('value');
        childs.length && childs.forEach(child => {
            child.data.set('checked', value === child.data.get('value'));
            child.data.set('disabled', 'disabled' in child.data.get()
                ? child.data.get('disabled') : this.data.get('disabled'));
            child.data.set('name', this.data.get('name') || this.data.get('id'));
        });
    },
    messages: {
        santd_radio_toggleOption(payload) {
            const option = payload.value;
            this.data.set('value', option.value);
            this.fire('change', option.event);
            this.dispatch('UI:form-item-interact', {fieldValue: option.value, type: 'change'});
        },
        santd_radio_add(payload) {
            const checkboxs = this.data.get('checkboxs');
            // 当没有options数据的时候才去收集子checkbox
            if (!checkboxs.length) {
                this.data.push('childs', payload.value);
            }
        }
    },
    template: `
        <div class="{{classes}}" style="{{style}}">
            <s-radio
                s-if="{{checkboxs.length}}"
                s-for="checkbox in checkboxs"
                prefixCls="{{prefixCls}}"
                key="{{checkbox.key}}"
                disabled="{{checkbox.disabled}}"
                value="{{checkbox.value}}"
                checked="{{checkbox.checked}}"
                name="{{name || id}}"
            >{{checkbox.label}}</s-radio>
            <slot></slot>
        </div>
    `
});
