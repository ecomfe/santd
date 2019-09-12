/**
* @file steps,step的外层容器
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';

const prefixCls = classCreator('steps')();

export default san.defineComponent({
    dataTypes: {
        direction: DataTypes.string,
        labelPlacement: DataTypes.string,
        current: DataTypes.number,
        progressDot: DataTypes.bool,
        size: DataTypes.string,
        status: DataTypes.string
    },
    initData() {
        return {
            direction: 'horizontal',
            labelPlacement: 'horizontal',
            current: 0,
            status: 'process',
            size: '',
            progressDot: false,
            flexSupported: true
        };
    },
    computed: {
        classes() {
            const direction = this.data.get('direction');
            const size = this.data.get('size');
            const labelPlacement = this.data.get('labelPlacement');
            const hasDot = this.data.get('hasDot');
            const adjustedlabelPlacement = hasDot ? 'vertical' : labelPlacement;
            const flexSupported = this.data.get('flexSupported');
            let classArr = [prefixCls, `${prefixCls}-${direction}`];

            size && classArr.push(`${prefixCls}-${size}`);
            direction === 'horizontal' && classArr.push(`${prefixCls}-label-${adjustedlabelPlacement}`);
            !!hasDot && classArr.push(`${prefixCls}-dot`);
            !flexSupported && classArr.push(`${prefixCls}-flex-not-supported`);

            return classArr;
        }
    },
    inited() {
        this.items = [];
        this.data.set('hasDot', this.data.get('progressDot') || !!this.sourceSlots.named.progressDot);
    },
    updated() {
        const status = this.data.get('status');
        const current = this.data.get('current');

        // 判断是否有change方法
        const hasChange = !!this.listeners.change;
        this.items.forEach((item, index) => {
            item.data.set('stepNumber', index + 1);
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
    },
    attached() {
        this.updated();
    },
    messages: {
        santd_steps_addStep(payload) {
            this.items.push(payload.value);
        },
        santd_steps_clickStep(payload) {
            const current = this.data.get('current');
            if (current !== payload.value) {
                this.fire('change', payload.value);
            }
        }
    },
    template: `<div class="{{classes}}">
        <slot />
    </div>`
});
