/**
 * @file select/Input
 * @author
 */
import Base from 'santd/base';
import {prefixCls} from './util';
import KeyCode from '../core/util/keyCode';
import {
    InputProps as Props,
    InputState as State
} from './interface';

export default class Input extends Base<State, Props> {
    static template = `
        <div class="${prefixCls}-search__field__wrap">
            <input
                s-ref="input"
                id="{{context.id}}"
                auto-complete="off"
                class="${prefixCls}-search__field"
                disabled="{{context.disabled}}"
                value="{=inputValue=}"
                on-change="handleInputChange"
                on-input="handleInputChange"
                on-keydown="handleInputKeyDown"
            />
            <span
                s-ref="inputMirror"
                class="${prefixCls}-search__field__mirror"
            >{{inputValue}}{{'&nbsp;'|raw}}</span>
        </div>
    `

    initData(): State {
        return {
            context: {},
            inputValue: ''
        };
    }

    attached() {
        const $input = this.ref('input') as unknown as HTMLInputElement;
        const $inputMirror = this.ref('inputMirror') as unknown as HTMLSpanElement;
        const modeConfig = this.data.get('context.modeConfig');

        if (modeConfig?.multiple || modeConfig?.tags) {
            this.watch('inputValue', value => {
                this.nextTick(() => {
                    if (value && $input && $inputMirror) {
                        $input.style.width = `${$inputMirror.clientWidth}px`;
                    }
                    else if ($input) {
                        $input.style.width = '';
                    }
                });
            });
        }

        this.dispatch('select:setInputElement', $input);
    }

    handleInputChange(e: InputEvent) {
        this.dispatch('select:inputChange', e);
    }

    handleInputKeyDown(e: KeyboardEvent) {
        const {modeConfig, realOpen} = this.data.get('context');

        if (e.keyCode === KeyCode.ENTER) {
            if (modeConfig?.single && realOpen || !modeConfig?.single && !realOpen) {
                e.stopPropagation();
            }
        }
        this.dispatch('select:inputKeyDown', e);
    }
};
