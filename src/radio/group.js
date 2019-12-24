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
            const value = this.data.get('value');
            const disabled = this.data.get('disabled');

            return options.map(option => {
                let radioOption = typeof option === 'string'
                    ? {
                        label: option,
                        value: option
                    }
                    : {
                        label: option.label,
                        value: option.value
                    };

                radioOption.disabled = option.disabled != null ? option.disabled : disabled;
                radioOption.checked = (value === radioOption.value);
                return radioOption;
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
        const disabled = this.data.get('disabled');
        const name = this.data.get('name');

        this.radios && this.radios.forEach(child => {
            child.data.set('checked', value === child.data.get('value'));
            child.data.set('disabled', child.data.get('disabled') || disabled);
            child.data.set('name', name);
        });
    },

    messages: {
        santd_radio_toggleOption(payload) {
            const option = payload.value;
            this.data.set('value', option.value);
            this.fire('change', option.event);
            this.dispatch('UI:form-item-interact', {fieldValue: option.value, type: 'change', e: payload.value.e});
        },

        santd_radio_add(payload) {
            // 当没有options数据的时候才去收集子checkbox
            if (!this.data.get('options').length) {
                this.radios.push(payload.value);
            }
        }
    },

    attached() {
        this.updated();
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
                name="{{name}}"
            >{{radio.label}}</s-radio>
            <slot />
        </div>
    `
});
