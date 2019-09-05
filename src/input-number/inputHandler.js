/**
* @file input-number中上下键处理
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import Icon from '../icon';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        direction: DataTypes.string,
        disabled: DataTypes.bool
    },

    components: {
        's-icon': Icon
    },

    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const direction = this.data.get('direction');
            let classArr = [`${prefixCls}-handler`, `${prefixCls}-handler-${direction}`];

            this.data.get('disabled') && direction && classArr.push(`${prefixCls}-handler-${direction}-disabled`);
            return classArr;
        }
    },

    valueChange(e) {
        this.dispatch('santd_inputnumber_' + this.data.get('direction'));
    },

    template: `
        <span
            class="{{classes}}"
            unselectable="unselectable"
            role="button"
            aria-label="Decrease Value"
            aria-disabled="{{disabled || false}}"
            on-click="valueChange"
        >
            <s-icon type="{{direction}}" class="{{prefixCls}}-handler-{{direction}}-inner" />
        </span>
    `
});
