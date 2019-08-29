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
        <s-icon type="right" rotate="{{isActive ? 90 : 0}}" />
    </span>`
});

const Collapse = san.defineComponent({
    dataTypes: {
        bordered: DataTypes.bool,
        className: DataTypes.string,
        prefixCls: DataTypes.string,
        destroyInactivePanel: DataTypes.bool
    },

    computed: {
        classes() {
            const bordered = this.data.get('bordered');
            const prefixCls = this.data.get('prefixCls');
            return !bordered ? `${prefixCls}-borderless` : '';
        }
    },

    initData() {
        return {
            prefixCls,
            bordered: true,
            accordion: false,
            linkChildren: [],
            expandIcon,
            destroyInactivePanel: false
        };
    }
});


san.inherits(Collapse, BaseCollapse);

export default Collapse;
