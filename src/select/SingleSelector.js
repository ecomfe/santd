/**
 * @file select/SingleSelector
 * @author
 */

import san, {DataTypes} from 'san';
import {
    getMapKey,
    prefixCls,
    toArray,
    toTitle
} from './util';

export default san.defineComponent({
    template: `
        <div title="{{optionInfo.title}}"
            class="${prefixCls}-selection-selected-value"
            style="{{style}}"
        >
            {{optionInfo.label}}
        </div>
    `,

    computed: {
        optionInfo() {
            const {optionsInfo = {}, value} = this.data.get('context');
            let singleValue = toArray(value)[0];
            let info = optionsInfo[getMapKey(singleValue)];

            if (info) {
                info.title = toTitle(info.title || info.label);
                return info;
            }
            return {
                label: this.data.get('inputValue')
            };
        },

        style() {
            let showSelectedValue = false;
            let opacity = 1;
            const inputValue = this.data.get('inputValue');
            const {open, showSearch} = this.data.get('context');

            if (!showSearch) {
                showSelectedValue = true;
            }
            else if (open) {
                showSelectedValue = !inputValue;
                if (showSelectedValue) {
                    opacity = 0.4;
                }
            }
            else {
                showSelectedValue = true;
            }

            return {
                display: showSelectedValue ? 'block' : 'none',
                opacity
            };
        }
    },

    dataTypes: {
        context: DataTypes.object,
        inputValue: DataTypes.string
    },

    initData() {
        return {
            context: {},
            inputValue: ''
        };
    }
});
