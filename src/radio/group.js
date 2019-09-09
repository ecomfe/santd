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
        defaultValue: DataTypes.oneOf([DataTypes.string, DataTypes.number]),
        value: DataTypes.oneOf([DataTypes.string, DataTypes.number]),
        options: DataTypes.array,
        disabled: DataTypes.bool,
        name: DataTypes.string
    },

    components: {
        's-radio': Radio
    },

    initData() {
        return {
            buttonStyle: 'outline',
            options: [],
            disabled: false
        };
    },

    computed: {
        radios() {
            const options = this.data.get('options');
            const value = this.data.get('value') || [];
            return options.map(option => {
                if (typeof option === 'string') {
                    option = {
                        label: option,
                        value: option
                    };
                }
                option.disabled = 'disabled' in option ? option.disabled : this.data.get('disabled');
                option.checked = (value === option.value);
                return {
                    ...option
                };
            });
        }
    },

    inited() {
        this.radios = [];
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || '');
    },

    disposed() {
        this.radios = null;
    },

    updated() {
        const value = this.data.get('value');
        this.radios && this.radios.forEach(child => {
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
            const radios = ;
            // 当没有options数据的时候才去收集子checkbox
            if (!this.data.get('options').length) {
                this.radios.push(payload.value)
            }
        }
    },

    template: `
        <div class="${prefixCls}-group ${prefixCls}-group-{{buttonStyle}} {{size ? '${prefixCls}-group-' + size : ''}}">
            <s-radio
                s-if="{{radios.length}}"
                s-for="radio in radios"
                prefixCls="${prefixCls}"
                disabled="{{radio.disabled}}"
                value="{{radio.value}}"
                checked="{{radio.checked}}"
                name="{{name || id}}"
            >{{radio.label}}</s-radio>
            <slot />
        </div>
    `
});