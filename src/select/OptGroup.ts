/**
 * @file select/OptGroup
 * @author
 */
import Base from 'santd/base';
import {
    OptGroupProps as Props,
    OptGroupState as State,
    BaseOptionType
} from './interface';


type Messages = {
    'select:addOptionToGroup': (this: OptGroup, payload: {value: {option: BaseOptionType}}) => void;
}

export default class OptGroup extends Base<State, Props> {
    isSelectOptionGroup: boolean = true;

    static template = `
        <template>
            <slot/>
        </template>
    `
    static messages: Messages = {
        'select:addOptionToGroup'({value: option}) {
            this.data.push('options', option, {silent: true});
        }
    }

    inited() {
        return {
            options: []
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

export type TOptGroup = typeof OptGroup;
