/**
 * @file 组件 collapse
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import BaseCollapse from './src/index';
import Icon from 'santd/icon';

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
    computed: {
        classes() {
            const bordered = this.data.get('bordered');
            const className = this.data.get('className');
            const prefixCls = this.data.get('prefixCls');

            return classNames(prefixCls, {
                [`${prefixCls}-borderless`]: !bordered
            }, className);
        }
    },
    initData() {
        return {
            prefixCls: prefixCls,
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
