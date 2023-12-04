// /**
//  * @file select/Selector
//  * @author

import Base from 'santd/base';

import Icon from '../icon';

import Input from './Input';

import MultipleSelector from './MultipleSelector';

import SingleSelector from './SingleSelector';

import {prefixCls, preventDefaultEvent, isValueArray, isValueString} from './util';
import Button from '../button';
import Select from './Select';
import {
    SelectorState as State,
    SelectorProps as Props,
    SelectorComputed as Computed,
    TDeSelectEventItem,
    RawValueType
} from './interface';

export default class Selector extends Base<State, Props, Computed> {
    static template = `
        <div class="${prefixCls}-selection__rendered">
            <div
                s-if="context.placeholder"
                class="${prefixCls}-selection__placeholder ${prefixCls}-unselectable"
                style="display: {{hidePlaceholder ? 'none' : 'block'}};"
                unselectable="on"
                on-click="handlePlaceholderClick"
                on-mousedown="preventDefaultEvent"
            >
                {{context.placeholder}}
            </div>
            <template s-if="context.modeConfig.single">
                <s-single-selector
                    s-if="context.value.length"
                    context="{{context}}"
                    inputValue="{{inputValue}}"
                />
                <div
                    s-if="context.showSearch"
                    class="${prefixCls}-search ${prefixCls}-search--inline"
                    style="display: {{context.open ? 'block' : 'none'}}"
                >
                    <s-input context="{{context}}" inputValue="{=inputValue=}" />
                </div>
            </template>
            <template s-else>
                <s-multiple-selector
                    context="{{context}}"
                    on-change="handleChange"
                    on-deselect="handleDeselect"
                >
                    <slot name="removeIcon" slot="removeIcon">
                        <s-icon type="close" class="${prefixCls}-remove-icon"/>
                    </slot>
                    <s-input slot="input" context="{{context}}" inputValue="{=inputValue=}" />
                </s-multiple-selector>
            </template>
        </div>
    `

    static components = {
        's-icon': Icon,
        's-input': Input,
        's-single-selector': SingleSelector,
        's-multiple-selector': MultipleSelector,
        's-button': Button
    }

    static computed: Computed = {
        hidePlaceholder(this: Selector) {

            let hidden = false;
            const inputValue = this.data.get('inputValue');
            const {value = '', modeConfig} = this.data.get('context');

            if (isValueArray(value) || isValueString(value)) {
                if (inputValue || value.length) {
                    hidden = true;
                }
                if (modeConfig?.combobox && value.length === 1 && (value && !value[0])) {
                    hidden = false;
                }
            }

            return hidden;
        }
    }

    initData(): State {
        return {
            context: {},
            inputValue: ''
        };
    }

    handleChange(value: RawValueType[]) {
        (this.owner as Select).fireChange(value);
    }

    handleDeselect(value: TDeSelectEventItem) {
        this.owner.fire('deselect', value);
    }

    handlePlaceholderClick() {
        (this.owner as Select).handlePlaceholderClick();
    }

    preventDefaultEvent = preventDefaultEvent
}