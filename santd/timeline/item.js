/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

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
            let classArr = [`${prefixCls}-item`, className];
            pending && classArr.push(`${prefixCls}-item-pending`);
            return classArr;
        },
        dotClasses() {
            const dot = this.data.get('dot');
            const color = this.data.get('color');
            let classArr = [`${prefixCls}-item-head`, `${prefixCls}-item-head-${color}`];
            dot && classArr.push(`${prefixCls}-item-head-custom`);
            return classArr;
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
