/**
 * @file button group
 * @author fuqiangqiang@baidu.com
 */
import Base from 'santd/base';
import {classCreator} from '../core/util/index';
import type {
    ButtonGroupState as State,
    ButtonGroupProps as Props,
    ButtonComputed as Computed
} from './interface';

const PREFIX_CLASS = classCreator('btn-group')();

export default class ButtonGroup extends Base<State, Props> {
    initData(): State {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    }

    static computed: Computed = {
        classes(this: ButtonGroup) {
            let arr = [PREFIX_CLASS];

            let size = this.data.get('sizeMap')[this.data.get('size')];
            size && arr.push(`${PREFIX_CLASS}-${size}`);

            return arr;
        }
    }

    static template = /* html */ `
        <div class="{{classes}}" style="font-size:0;"><slot/></div>
    `
};

export type TButtonGroup = typeof ButtonGroup;

