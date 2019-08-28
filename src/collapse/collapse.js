/**
 * @file 组件 collapse
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import BaseCollapse from './src/index';
import Icon from '../icon';

const prefixCls = classCreator('collapse')();

const expandIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<span>
        <s-icon type="right" rotate="{{isActive ? 90 : 0}}"></s-icon>
    </span>`
});

const Collapse = san.defineComponent({
    dataTypes: {
        bordered: DataTypes.bool,
        className: DataTypes.string,
        prefixCls: DataTypes.string
    },
    computed: {
        classes() {
            const bordered = this.data.get('bordered');
            const className = this.data.get('className');
            const prefixCls = this.data.get('prefixCls');
            let classArr = [prefixCls];

            className && classArr.push(className);
            !bordered && classArr.push(`${prefixCls}-borderless`);

            return classArr;
        }
    },
    initData() {
        return {
            prefixCls,
            bordered: true,
            accordion: false,
            destroyInactivePanel: false,
            children: [],
            expandIcon: expandIcon
        };
    }
});


san.inherits(Collapse, BaseCollapse);

export default Collapse;
