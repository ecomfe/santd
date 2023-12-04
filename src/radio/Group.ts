/**
 * @file Santd radio group file
 * @author mayihui@baidu.com
 **/
import {classCreator} from '../core/util';
import Radio from './Radio';
import Base from 'santd/base';
import {
    GroupState as State,
    GroupProps as Props,
    GroupComputed as Computed,
    GroupRadioOption,
    Radio as RadioComp,
    RadioValueType,
    RadioOptionType,
    OptionsItem,
    RadioChangeEvent
} from './interface';

type Message = {
    santd_radio_toggleOption: (this: Group, payload: {value: {value: RadioValueType, event: RadioChangeEvent}}) => void,
    santd_radio_add: (this: Group, payload: {value:  RadioComp}) => void
};

function isOptionObject(options: OptionsItem): options is RadioOptionType {
    return typeof options !== 'string' && typeof options !== 'number';
}

const prefixCls = classCreator('radio')();

export type TGroup = typeof Group;

export default class Group extends Base<State, Props, Computed> {

    static components = {
        's-radio': Radio
    }

    initData(): State {
        return {
            buttonStyle: 'outline',
            options: [],
            disabled: false
        };
    }

    static computed: Computed = {
        radios(this: Group) {
            const options = this.data.get('options');
            const value = this.data.get('value');
            const disabled = this.data.get('disabled');

            return options.map(option => {
                let radioOption: GroupRadioOption = !isOptionObject(option)
                    ? {
                        label: `${option}`,
                        value: `${option}`
                    }
                    : {
                        label: option.label,
                        value: option.value
                    };

                radioOption.disabled = isOptionObject(option) && option.disabled != null ? option.disabled : disabled;
                radioOption.checked = (value === radioOption.value);
                return radioOption;
            });
        }
    }

    radios!: RadioComp[] | null

    inited() {
        this.radios = [];
        const {value, defaultValue} = this.data.get();
        if (value !== undefined) {
            this.data.set('value', value);
        }
        else if (defaultValue !== undefined) {
            this.data.set('value', defaultValue);
        }
    }

    disposed() {
        this.radios = null;
    }

    updated() {
        const value = this.data.get('value');
        const disabled = this.data.get('disabled');
        const name = this.data.get('name');

        this.radios && this.radios.forEach(child => {
            child.data.set('checked', value === child.data.get('value'));
            child.data.set('disabled', child.data.get('disabled') || disabled);
            child.data.set('name', name);
        });
    }

    static messages: Message = {
        santd_radio_toggleOption(payload) {
            const option = payload.value;
            this.data.set('value', option.value);
            this.fire('change', option.event);
            this.dispatch('UI:form-item-interact', {fieldValue: option.value, type: 'change', e: option.event});
        },

        santd_radio_add(payload) {
            // 当没有options数据的时候才去收集子checkbox
            if (!this.data.get('options').length) {
                this.radios?.push(payload.value);
            }
        }
    }

    attached() {
        this.updated();
    }

    static template = /* html */`
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
};
