/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import Item from './item';
import Icon from '../icon';

const prefixCls = classCreator('timeline')();

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        pending: DataTypes.oneOfType([DataTypes.string, DataTypes.bool, DataTypes.func]),
        pendingDot: DataTypes.oneOfType([DataTypes.string, DataTypes.func]),
        reverse: DataTypes.bool,
        mode: DataTypes.oneOf(['left', 'alternate', 'right']),
        children: DataTypes.array
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const pending = this.data.get('pending');
            const reverse = this.data.get('reverse');
            const mode = this.data.get('mode');

            return classNames(prefixCls, {
                [`${prefixCls}-pending`]: !!pending,
                [`${prefixCls}-reverse`]: !!reverse,
                [`${prefixCls}-${mode}`]: !!mode
            }, className);
        },
        isComponent() {
            const pending = this.data.get('pending');
            return typeof pending === 'function';
        }
    },
    initData() {
        return {
            reverse: false,
            mode: 'left',
            children: [],
            defaultDot: san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: '<span><s-icon type="loading" /></span>'
            })
        };
    },
    updated() {
        const children = this.data.get('children');
        const reverse = this.data.get('reverse');
        const pending = this.data.get('pending');
        const lastClasses = `${prefixCls}-item-last`;

        children.forEach((child, index) => {
            const className = classNames([
                child.data.get('className'),
                !reverse && !!pending
                    ? index === children.length - 2
                        ? lastClasses : ''
                    : index === children.length - 1
                    ? lastClasses : '',
                this.getPositionCls(child, index)
            ]);
            child.data.set('className', className);
        });
    },
    attached() {
        this.watch('reverse', val => {
            this.sourceSlots.noname = this.sourceSlots.noname.reverse();
            this._repaintChildren();
        });
    },
    compiled() {
        const parent = this.parentComponent;
        const pending = parent.data.get('pending');
        pending && (this.components.pending = pending);
    },
    getPositionCls(child, index) {
        const mode = this.data.get('mode');
        const position = child.data.get('position');

        if (mode === 'alternate') {
            if (position) {
                return `${prefixCls}-item-${position}`;
            }
            return index % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
        }
        if (mode) {
            return `${prefixCls}-item-${mode}`;
        }
        if (position === 'right') {
            return `${prefixCls}-item-right`;
        }
        return '';
    },
    messages: {
        addItem(payload) {
            this.data.push('children', payload.value);
        }
    },
    components: {
        's-item': Item,
        's-icon': Icon
    },
    template: `
        <ul class="{{classes}}">
            <template s-if="!reverse">
                <slot></slot>
                <s-item s-if="pending" pending="{{!!pending}}" dot="{{pendingDot || defaultDot}}" s-ref="pending">
                    <template s-if="!isComponent">{{pending}}</template>
                    <pending s-else></pending>
                </s-item>
            </template>
            <template s-else>
                <s-item s-if="pending" pending="{{!!pending}}" dot="{{pendingDot || defaultDot}}" s-ref="pending">
                    <template s-if="!isComponent">{{pending}}</template>
                    <pending s-else></pending>
                </s-item>
                <slot></slot>
            </template>
        </ul>
    `
});
