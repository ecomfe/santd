/**
* @file input-number中上下键处理
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import Icon from '../icon';
const prefixCls = classCreator('input-number')();

export default san.defineComponent({
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            const upOrDown = this.data.get('klass.direction');
            const disabledClass = this.data.get('disabled');
            return classNames({
                [`${prefixCls}-handler`]: true,
                [`${prefixCls}-handler-${upOrDown}`]: true,
                [`${prefixCls}-handler-up-disabled`]: disabledClass && upOrDown === 'up',
                [`${prefixCls}-handler-down-disabled`]: disabledClass && upOrDown === 'down'
            });
        },
        iconClass() {
            const upOrDown = this.data.get('klass.direction');
            return classNames({
                [`${prefixCls}-handler-${upOrDown}-inner`]: true
            });
        }
    },
    initData() {
        return {
            disabled: false
        };
    },
    inited() {
        const klass = this.data.get('klass');
        this.data.set('disabled', (klass.disabled || false));
        this.watch('klass.disabled', isDisabled => {
            this.data.set('disabled', isDisabled);
        });
    },

    valueChange(e) {
        const upOrDown = this.data.get('klass.direction');
        if (upOrDown === 'up') {
            // 加
            this.dispatch('valueWillAdd');
        } else if (upOrDown === 'down') {
            // 减
            this.dispatch('valueWillSub');
        }
    },
    template: `
        <span
            class="{{classes}}"
            unselectable="unselectable"
            role="button"
            aria-label="Decrease Value"
            aria-disabled="{{disabled}}"
            on-click="valueChange"
        >
            <s-icon type="{{klass.direction}}" class="{{iconClass}}"></s-icon>
        </span>
    `
});
