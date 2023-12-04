/**
 * @file select/SingleSelector
 * @author
 */
import Base from 'santd/base';
import {
    getMapKey,
    prefixCls,
    toArray,
    toTitle
} from './util';
import {
    SingleSelectorState as State,
    SingleSelectorProps as Props,
    SingleSelectorComputed as Computed
} from './interface';


export default class SingleSelector extends Base<State, Props, Computed> {
    static template = `
        <div title="{{optionInfo.title}}"
            class="${prefixCls}-selection-selected-value"
            style="{{style}}"
        >
            {{optionInfo.label | raw}}
        </div>
    `

    static computed: Computed = {
        optionInfo(this: SingleSelector) {
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

        style(this: SingleSelector) {
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
    }

    initData(): State {
        return {
            context: {},
            inputValue: ''
        };
    }
};
