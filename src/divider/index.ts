/**
 * @file 组件 divider
 */
import './style/index.less';
import {classCreator} from '../core/util';
import Base from 'santd/base';
import type * as I from './interface';

const prefixCls = classCreator('divider')();

export default class Divider extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div class="{{classes}}">
            <span s-if="hasSlot" class="${prefixCls}-inner-text">
                <slot />
            </span>
        </div>
    `;

    static computed: I.Computed = {
        classes(this: Divider) {
            const dashed = this.data.get('dashed');
            const type = this.data.get('type');
            const orientation = this.data.get('orientation');
            const hasSlot = this.data.get('hasSlot');
            let classArr = [prefixCls];

            !!type && classArr.push(`${prefixCls}-${type}`);
            dashed && classArr.push(`${prefixCls}-dashed`);
            hasSlot && !orientation && classArr.push(`${prefixCls}-with-text`);
            hasSlot && orientation && classArr.push(`${prefixCls}-with-text-${orientation}`);

            return classArr;
        }
    };

    inited() {
        this.data.set('hasSlot', !!this.sourceSlots.noname);
    };

    initData(): I.State {
        return {
            type: 'horizontal'
        };
    };
};
