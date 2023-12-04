/**
 * @file select/Input
 * @author
 */

import {classCreator} from '../core/util';
const prefixCls = classCreator('select')();
import Base from 'santd/base';

interface State {
    inputValue: string,
    searchValue: string,
    multiple: boolean,
    popupVisible: boolean
}

interface headerInput {
    target: {
        value: string
    };
    [key: string]: any;
}
export default class Input extends Base<State> {
    static template = `
        <div class="${prefixCls}-search__field__wrap">
            <input
                s-ref="input"
                auto-complete="off"
                class="${prefixCls}-search__field"
                value="{{value}}"
                on-input="handleInputChange"
                on-keydown="handleInputKeyDown"
                on-blur="handleInpurBlur"
            />
            <span
                s-ref="inputMirror"
                class="${prefixCls}-search__field__mirror"
            >{{value}}{{'&nbsp;'|raw}}</span>
        </div>
    `

    initData(): State {
        return {
            inputValue: '',
            searchValue: '',
            multiple: false,
            popupVisible: false
        };
    }

    static computed = {
        value(this: Input) {
            return this.data.get('searchValue') || this.data.get('inputValue');
        }
    }

    attached() {
        const {multiple, searchValue} = this.data.get();
        const $input = this.ref('input');

        multiple && searchValue && this.setInputWidth();

        if (this.data.get('multiple')) {
            this.watch('value', value => {
                value && this.nextTick(() => this.setInputWidth());
            });
        }

        this.dispatch('santd_treeselect_setInputElement', $input);
    }

    setInputWidth() {
        const $input = this.ref('input') as unknown as HTMLInputElement;
        const $inputMirror = this.ref('inputMirror') as unknown as HTMLInputElement;
        if ($input && $inputMirror) {
            $input.style.width = `${$inputMirror.clientWidth + 16}px`;
        }
        else if ($input) {
            $input.style.width = '';
        }
    }

    handleInputChange(e: headerInput) {
        const searchValue = this.data.get('searchValue');
        const value = e.target.value;
        if (searchValue && value !== searchValue) {
            e.target.value = searchValue;
            e.preventDefault();
            e.stopPropagation();
            this.dispatch('santd_treeselect_inputSearch', value);
            return;
        }
        this.dispatch('santd_treeselect_inputChange', value);
    }

    handleInputKeyDown(e: KeyboardEvent) {
        this.dispatch('santd_treeselect_inputKeyDown', e);
    }

    handleInpurBlur(e: MouseEvent) {
        this.dispatch('santd_treeselect_inputBlur', e);
    }
};
