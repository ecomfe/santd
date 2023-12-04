/**
 * @file Santd checkbox group file
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util';
import Checkbox from './Checkbox';

import Base from 'santd/base';
import type {
    GroupState as State,
    GroupProps as Props,
    GroupComputed as Computed,
    Checkbox as CheckboxComp,
    GroupOption,
    OptionItem,
    CheckboxChangeEvent,
    ValueType
} from './interface';

type Message = {
    santd_checkbox_toggleOption: (this: Group, payload: {value: {value: ValueType, e: CheckboxChangeEvent}}) => void,
    santd_checkbox_add: (this: Group, payload: {value:  CheckboxComp}) => void
};

export type TGroup = typeof Group;

const prefixCls = classCreator('checkbox')();

function isOptionObject(options: OptionItem): options is GroupOption {
    return typeof options !== 'string' && typeof options !== 'number';
}

export default class Group extends Base<State, Props, Computed> {

    static components = {
        's-checkbox': Checkbox
    }

    initData(): State {
        return {
            options: [],
            disabled: false
        };
    }

    static computed: Computed = {
        checkboxs(this: Group) {
            const options = this.data.get('options');
            const value = this.data.get('value') || [];
            const disabled = this.data.get('disabled');

            return options.map(option => {
                let checkBoxOption: GroupOption = !isOptionObject(option)
                    ? {
                        label: `${option}`,
                        value: `${option}`
                    }
                    : {
                        label: option.label,
                        value: option.value
                    };


                checkBoxOption.disabled = isOptionObject(option) && option.disabled != null ? option.disabled : disabled;
                checkBoxOption.checked = value.indexOf(checkBoxOption.value) !== -1;
                return checkBoxOption;
            });
        }
    }

    checkboxs!: Array<CheckboxComp> | null

    inited() {
        this.checkboxs = [];
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || []);
    }

    disposed() {
        this.checkboxs = null;
    }

    updated() {
        const value = this.data.get('value') || [];
        this.checkboxs?.forEach(child => {
            child.data.set('checked', value.indexOf(child.data.get('value')!) !== -1);
            child.data.set('disabled', child.data.get('disabled') || this.data.get('disabled'));
            child.data.set('name', this.data.get('name'));
        });
    }

    static messages: Message = {
        santd_checkbox_toggleOption(payload) {
            const option = payload.value;
            const optionIndex = this.data.get('value')?.indexOf(option.value);
            if (optionIndex === -1) {
                this.data.push('value', option.value);
            }
            else {
                optionIndex !== undefined && this.data.removeAt('value', optionIndex);
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
                this.checkboxs?.push(payload.value);
            }
        }
    }

    static template = /* html */ `
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
};
