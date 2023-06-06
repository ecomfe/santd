/**
 * @file select/Option
 * @author
 */
import Base from 'santd/base';
import {
    OptionProps as Props,
    OptionState as State
} from './interface';

export default class Option extends Base<State, Props> {
    isSelectOption: boolean = true;

    static template = `
        <template>
            <slot/>
        </template>
    `

    initData() {
        return {
            disabled: false
        };
    }

    attached() {
        this.dispatch('select:updateOptions', null);
    }

    updated() {
        this.dispatch('select:updateOptions', null);
    }

    detached() {
        this.dispatch('select:updateOptions', null);
    }
};

export type TOption = typeof Option;
