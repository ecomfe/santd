/**
 * @file select/Input
 * @author
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('select')();

export default san.defineComponent({
    dataTypes: {
        inputValue: DataTypes.string,
        searchValue: DataTypes.string,
        multiple: DataTypes.bool,
        popupVisible: DataTypes.bool
    },

    template: `
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
    `,

    initData() {
        return {
            inputValue: '',
            searchValue: '',
            multiple: false,
            popupVisible: false
        };
    },

    computed: {
        value() {
            return this.data.get('searchValue') || this.data.get('inputValue');
        }
    },

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
    },

    setInputWidth() {
        const $input = this.ref('input');
        const $inputMirror = this.ref('inputMirror');
        if ($input && $inputMirror) {
            $input.style.width = `${$inputMirror.clientWidth + 16}px`;
        }
        else if ($input) {
            $input.style.width = '';
        }
    },

    handleInputChange(e) {
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
    },

    handleInputKeyDown(e) {
        this.dispatch('santd_treeselect_inputKeyDown', e);
    },

    handleInpurBlur(e) {
        this.dispatch('santd_treeselect_inputBlur', e);
    }
});
