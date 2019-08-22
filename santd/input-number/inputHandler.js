/**
* @file input-number中上下键处理
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import Icon from '../icon';

export default san.defineComponent({
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const upOrDown = this.data.get('klass.direction');
            const disabledClass = this.data.get('klass.disabled') || false;
            let classArr = [`${prefixCls}-handler`, `${prefixCls}-handler-${upOrDown}`];

            disabledClass && upOrDown === 'up' && classArr.push(`${prefixCls}-handler-up-disabled`);
            disabledClass && upOrDown === 'down' && classArr.push(`${prefixCls}-handler-down-disabled`);
            return classArr;
        }
    },

    valueChange(e) {
        const upOrDown = this.data.get('klass.direction');
        this.dispatch('santd_inputnumber_' + upOrDown);
    },
    template: `
        <span
            class="{{classes}}"
            unselectable="unselectable"
            role="button"
            aria-label="Decrease Value"
            aria-disabled="{{klass.disabled || false}}"
            on-click="valueChange"
        >
            <s-icon type="{{klass.direction}}" class="{{prefixCls}}-handler-{{klass.direction}}-inner"></s-icon>
        </span>
    `
});
