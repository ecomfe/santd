/**
* @file steps,step的外层容器
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import './style/index.less';

const pagin = classCreator('steps');
const prefixCls = pagin();

export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        current: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        direction: DataTypes.oneOf(['horizontal', 'vertical']),
        progressDot: DataTypes.oneOfType([DataTypes.bool, DataTypes.func]),
        size: DataTypes.oneOf(['default', 'small']),
        status: DataTypes.oneOf(['wait', 'process', 'finish', 'error'])
    },
    computed: {
        classes() {
            // 展现方向，默认是horizontal
            const direction = this.data.get('direction') || 'horizontal';
            const size = this.data.get('size');
            const progressDot = this.data.get('progressDot');
            // labelPlacement如果没有传，默认横向
            const labelPlacement = this.data.get('labelPlacement') || 'horizontal';
            // 如果传入progressDot，则强制纵向
            const adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement;
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-${direction}`]: true,
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
                [`${prefixCls}-dot`]: !!progressDot
            }, this.data.get('className'));
        }
    },
    initData() {
        return {
            componentPropName: 's-steps',
            steps: []
        };
    },
    attached() {
        this.updateCurrent();
    },
    updated() {
        this.updateCurrent();
    },
    messages: {
        addStep(payload) {
            const status = this.data.get('status');
            const progressDot = this.data.get('progressDot');
            this.data.push('steps', payload.value);
            payload.value.data.set('status', status);
            payload.value.data.set('progressDot', progressDot);
            payload.value.data.set('prefixCls', prefixCls);
        }
    },
    updateCurrent() {
        const current = +this.data.get('current');
        const defaultStatus = this.data.get('status');
        const steps = this.data.get('steps');
        steps.forEach((child, index) => {
            if (index === current) {
                if (defaultStatus) {
                    child.data.set('status', defaultStatus);
                    steps[index - 1].data.set('nextError', true);
                } else {
                    child.data.set('status', 'process');
                }
            } else if (index < current) {
                child.data.set('status', 'finish');
            } else {
                child.data.set('status', 'wait');
            }
            child.data.set('stepNumber', index + 1);
        });
    },
    template: `
        <div class="{{classes}}">
            <slot></slot>
        </div>
    `
});
