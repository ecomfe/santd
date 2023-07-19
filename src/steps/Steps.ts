/**
* @file steps,step的外层容器
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import './style/index.less';
import {TStep} from './Step';
import {StepsComputed, StepsState, StepsProps} from './interface';

const prefixCls = classCreator('steps')();

type Messages = {
    santd_steps_addStep: (this: Steps,  payload: {value: any}) =>void;
    santd_steps_clickStep: (this: Steps, payload: {value: any}) =>void,
}

export default class Steps extends Base<StepsState, StepsProps> {
    items: Array<any> = [];
    listeners!: any;
    initData():StepsState {
        return {
            direction: 'horizontal',
            labelPlacement: 'horizontal',
            current: 0,
            status: 'process',
            size: 'default',
            progressDot: false,
            flexSupported: true,
            type: '',
            initial: 0
        };
    }
    static Step:TStep;
    static computed: StepsComputed= {
        classes(this: Steps) {
            const direction = this.data.get('direction');
            const size = this.data.get('size');
            const type = this.data.get('type');
            const labelPlacement = this.data.get('labelPlacement');
            const hasDot = this.data.get('hasDot');
            const adjustedlabelPlacement = hasDot ? 'vertical' : labelPlacement;
            const flexSupported = this.data.get('flexSupported');
            let classArr = [prefixCls, `${prefixCls}-${direction}`];

            size && classArr.push(`${prefixCls}-${size}`);
            type && classArr.push(`${prefixCls}-${type}`);
            direction === 'horizontal' && classArr.push(`${prefixCls}-label-${adjustedlabelPlacement}`);
            !!hasDot && classArr.push(`${prefixCls}-dot`);
            !flexSupported && classArr.push(`${prefixCls}-flex-not-supported`);

            return classArr;
        }
    }
    inited() {
        this.items = [];
        this.data.set('hasDot', this.data.get('progressDot') || !!this.sourceSlots.named.progressDot);
    }
    updated() {
        const status = this.data.get('status');
        const current = this.data.get('current');
        const initial = Number(this.data.get('initial'));

        // 判断是否有change方法
        const hasChange = !!this.listeners.change;
        this.items.forEach((item, index) => {
            item.data.set('stepNumber', index + initial + 1);
            item.data.set('stepIndex', index);
            status === 'error' && index === current - 1 && item.data.set('class', `${prefixCls}-next-error`);

            if (index === Number(current)) {
                item.data.set('status', status);
            }
            else {
                item.data.set('status', index < current ? 'finish' : 'wait');
            }
            item.data.set('hasChange', hasChange);
        });
    }
    attached() {
        this.updated();
    }
    static messages: Messages = {
        santd_steps_addStep(payload) {
            this.items.push(payload.value);
        },
        santd_steps_clickStep(payload) {
            let {stepIndex, disabled} = payload.value;
            const current = this.data.get('current');
            if (current !== stepIndex) {
                !disabled && this.data.set('current', stepIndex);
                this.fire('change', stepIndex);
            }
        }
    }
    static template = `<div class="{{classes}}">
        <slot />
    </div>`
};
