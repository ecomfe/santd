/**
 * @file select/Selector
 * @author
 */

import san, {DataTypes} from 'san';
import Icon from '../icon';
import Input from './Input';
import MultipleSelector from './MultipleSelector';
import SingleSelector from './SingleSelector';
import {prefixCls, preventDefaultEvent} from './util';

export default san.defineComponent({
    template: `
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
    `,

    components: {
        's-icon': Icon,
        's-input': Input,
        's-single-selector': SingleSelector,
        's-multiple-selector': MultipleSelector
    },

    dataTypes: {
        context: DataTypes.object,
        inputValue: DataTypes.string
    },

    computed: {
        hidePlaceholder() {
            let hidden = false;
            const inputValue = this.data.get('inputValue');
            const {value = '', modeConfig} = this.data.get('context');

            if (inputValue || value.length) {
                hidden = true;
            }
            if (modeConfig.combobox && value.length === 1 && (value && !value[0])) {
                hidden = false;
            }

            return hidden;
        }
    },

    initData() {
        return {
            context: {},
            inputValue: ''
        };
    },

    handleChange(value) {
        this.owner.fireChange(value);
    },

    handleDeselect(value) {
        this.owner.fire('deselect', value);
    },

    handlePlaceholderClick(e) {
        this.owner.handlePlaceholderClick(e);
    },

    preventDefaultEvent
});
