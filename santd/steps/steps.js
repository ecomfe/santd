/**
* @file steps,step的外层容器
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import './style/index.less';

const prefixCls = classCreator('steps')();

export default san.defineComponent({
    initData() {
        return {
            prefixCls,
            iconPrefix: 'san',
            direction: 'horizontal',
            labelPlacement: 'horizontal',
            initial: 0,
            current: 0,
            status: 'process',
            size: '',
            progressDot: false,
            flexSupported: true,
            lastStepOffsetWidth: 0,
            children: []
        };
    },
    computed: {
        classes() {
            const direction = this.data.get('direction');
            const className = this.data.get('className');
            const size = this.data.get('size');
            const labelPlacement = this.data.get('labelPlacement');
            const progressDot = this.data.get('progressDot');
            const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
            const flexSupported = this.data.get('flexSupported');

            return classNames(prefixCls, `${prefixCls}-${direction}`, className, {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
                [`${prefixCls}-dot`]: !!progressDot,
                [`${prefixCls}-flex-not-supported`]: !flexSupported
            });
        }
    },
    updated() {
        const children = this.data.get('children');
        const status = this.data.get('status');
        const current = this.data.get('current');
        const hasChange = !!this.listeners.change;
        children.forEach((child, index) => {
            child.data.set('stepNumber', index + 1);
            child.data.set('stepIndex', index);
            if (status === 'error' && index === current - 1) {
                child.data.set('className', `${prefixCls}-next-error`);
            }
            if (index === Number(current)) {
                child.data.set('status', status);
            }
            else if (index < current) {
                child.data.set('status', 'finish');
            }
            else {
                child.data.set('status', 'wait');
            }
            child.data.set('hasChange', hasChange);
        });
    },
    messages: {
        addStep(payload) {
            this.data.push('children', payload.value);
        },
        clickStep(payload) {
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
