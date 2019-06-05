/**
* @file 具体step
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import classNames from 'classnames';
import Icon from 'santd/icon';

const Dot = san.defineComponent({
    computed: {
        prefix() {
            return this.data.get('prefixCls') || 'san-steps';
        }
    },
    template: `
        <span class="{{prefix}}-icon-dot"></span>
    `
});

export default san.defineComponent({
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            // 获取状态
            const status = this.data.get('status') || 'wait';
            // 获取失败状态
            const nextError = this.data.get('nextError');
            return classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item-${status}`]: true,
                [`${prefixCls}-next-error`]: nextError
            });
        }
    },
    compiled() {
        const parent = this.parentComponent;
        const progressDot = parent.data.get('progressDot');
        this.components['s-dot'] = typeof progressDot === 'function'
            ? progressDot(Dot)
            : Dot;
    },
    initData() {
        return {
            stepNumber: 0,
            nextError: false
        };
    },
    attached() {
        this.dispatch('addStep', this);
    },
    template: `
        <div class="{{classes}}">
            <div class="{{prefixCls}}-item-tail"></div>
            <div class="{{prefixCls}}-item-icon">
                <span class="{{prefixCls}}-icon">
                    <slot name="icon">
                        <s-dot s-if="{{progressDot}}" prefixCls="{{prefixCls}}"></s-dot>
                        <s-icon type="check" s-else-if="{{status==='finish'}}"></s-icon>
                        <s-icon type="close" s-else-if="{{status==='error'}}"></s-icon>
                        <span s-else-if="{{stepNumber}}">{{stepNumber}}</span>
                    </slot>
                </span>
            </div>
            <div class="{{prefixCls}}-item-content">
                <div class="{{prefixCls}}-item-title">
                    <slot name="title">
                        {{title}}
                    </slot>
                </div>
                <div class="{{prefixCls}}-item-description">
                    <slot name="description">
                        {{description}}
                    </slot>
                </div>
            </div>
        </div>
    `
});
