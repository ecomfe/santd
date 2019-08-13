/**
 * @file 组件 divider
 */
import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('divider')();

export default san.defineComponent({
    dataTypes: {
        type: DataTypes.oneOf(['horizontal', 'vertical']),
        orientation: DataTypes.oneOf(['right', 'left', '']),
        dashed: DataTypes.bool
    },
    initData() {
        return {
            type: 'horizontal',
            orientation: '',
            hasSlot: false,
            prefixCls: prefixCls
        };
    },
    computed: {
        hasSlot() {
            const instance = this.data.get('instance');
            return instance && !!instance.slotChildren.length;
        },
        classes() {
            const dashed = this.data.get('dashed');
            const type = this.data.get('type');
            const orientation = this.data.get('orientation');
            const hasSlot = this.data.get('hasSlot');
            const className = this.data.get('className');
            let classArr = [prefixCls, className];
            !!type && classArr.push(`${prefixCls}-${type}`);
            dashed && classArr.push(`${prefixCls}-dashed`);
            hasSlot && !orientation && classArr.push(`${prefixCls}-with-text`);
            hasSlot && orientation && classArr.push(`${prefixCls}-with-text-${orientation}`);
            return classArr;
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    template: `
        <div class="{{classes}}">
            <span s-if="hasSlot" class="{{prefixCls}}-inner-text"><slot></slot></span>
      </div>
      `
});
