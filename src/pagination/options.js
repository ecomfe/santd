/**
 * @file Santd pagination options file
 **/

import san from 'san';
import Select from '../select';
import KEYCODE from '../core/util/keyCode';

export default san.defineComponent({
    components: {
        's-select': Select,
        's-option': Select.Option
    },
    handleChangeSize(value) {
        this.fire('changeSize', Number(value));
    },
    handleChange(e) {
        this.data.set('goInputText', e.target.value);
    },
    handleGo(e) {
        let val = this.data.get('goInputText');
        if (val === '') {
            return;
        }

        val = isNaN(val) ? this.data.get('current') : Number(val);
        if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
            this.data.set('goInputText', '');
            this.fire('quickGo', val);
        }
    },
    template: `
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
});
