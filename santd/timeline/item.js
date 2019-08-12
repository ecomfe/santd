/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';

const prefixCls = classCreator('timeline')();

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        color: DataTypes.string,
        dot: DataTypes.oneOfType([DataTypes.string, DataTypes.func]),
        pending: DataTypes.bool,
        position: DataTypes.string
    },
    initData() {
        return {
            color: 'blue',
            pending: false,
            position: ''
        };
    },
    computed: {
        classes() {
            const pending = this.data.get('pending');
            const className = this.data.get('className');
            return classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item-pending`]: pending
            }, className);
        },
        dotClasses() {
            const dot = this.data.get('dot');
            const color = this.data.get('color');
            return classNames({
                [`${prefixCls}-item-head`]: true,
                [`${prefixCls}-item-head-custom`]: dot,
                [`${prefixCls}-item-head-${color}`]: true
            });
        },
        dotStyle() {
            const color = this.data.get('color');
            if (!/blue|red|green/.test(color)) {
                return {
                    'border-color': color
                };
            }
        },
        isComponent() {
            const dot = this.data.get('dot');
            return typeof dot === 'function';
        }
    },
    inited() {
        this.dispatch('addItem', this);
    },
    attached() {
        const dotNode = this.ref('dot');
        const Dot = this.data.get('dot');
        const isComponent = this.data.get('isComponent');
        if (Dot && isComponent) {
            const instance = new Dot();
            instance.attach(dotNode);
            instance.parentComponent = this;
        }
    },
    template: `
        <li class="{{classes}}">
            <div class="${prefixCls}-item-tail" />
            <div class="{{dotClasses}}" style="{{dotStyle}}" s-ref="dot">
                <template s-if="!isComponent">{{dot}}</template>
            </div>
            <div class="${prefixCls}-item-content"><slot></slot></div>
        </li>
    `
});
