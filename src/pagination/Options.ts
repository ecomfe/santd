/**
 * @file Santd pagination options file
 **/
import Base from 'santd/base';
import Select from '../select';
import KEYCODE from '../core/util/keyCode';
import {
    OptionsState as State,
    OptionsProps as Props
} from './interface';

function isValueNotNaN(value: any): value is number {
    return !isNaN(value);
}

export default class Options extends Base<State, Props> {
    static components = {
        's-select': Select,
        's-option': Select.Option
    }
    handleChangeSize(value: string) {
        this.fire('changeSize', Number(value));
    }
    handleChange(e: InputEvent) {
        this.data.set('goInputText', (e.target as HTMLInputElement).value);
    }
    handleGo(e: any) {
        const val = this.data.get('goInputText');
        if (val === '') {
            return;
        }
        let newVal = isValueNotNaN(val) ? Number(val) : this.data.get('current');
        if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
            this.data.set('goInputText', '');
            this.fire('quickGo', newVal);
        }
    }
    static template = `
        <li class="{{rootPrefixCls}}-options">
            <s-select
                s-if="{{showSizeChanger}}"
                prefixCls="{{selectPrefixCls}}"
                class="{{rootPrefixCls}}-options-size-changer"
                optionLabelProp="children"
                defaultValue="{{pageSize || pageSizeOptions[0]}}"
                size="{{size}}"
                disabled="{{disabled}}"
                on-change="handleChangeSize"
            >
                <s-option s-for="pageSize in pageSizeOptions" value="{{pageSize}}" locale="{{locale}}">
                    {{pageSize}} {{locale.items_per_page}}
                </s-option>
            </s-select>
            <div
                s-if="{{quickGo}}"
                class="{{rootPrefixCls}}-options-quick-jumper"
            >
                {{locale.jump_to}}
                <input type="text" value="{{goInputText}}" on-change="handleChange" on-keyup="handleGo" disabled="{{disabled}}"/>
                {{locale.page}}
                <button s-if="{{goButton === true}}" on-click="handleGo" on-keyup="handleGo" disabled="{{disabled}}">
                    {{locale.jump_to_confirm}}
                </button>
                <span s-else on-click="handleGo" on-keyup="handleGo">{{goButton}}</span>
            </div>
        </li>
    `
};

export type TOptions = typeof Options;
