/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Item from './item';
import Icon from '../icon';

const prefixCls = classCreator('timeline')();

export default san.defineComponent({
    dataTypes: {
        reverse: DataTypes.bool,
        mode: DataTypes.oneOf(['left', 'alternate', 'right'])
    },
    computed: {
        classes() {
            const hasPending = this.data.get('hasPending');
            const reverse = this.data.get('reverse');
            const mode = this.data.get('mode');
            let classArr = [prefixCls];

            hasPending && classArr.push(`${prefixCls}-pending`);
            reverse && classArr.push(`${prefixCls}-reverse`);
            mode && classArr.push(`${prefixCls}-${mode}`);

            return classArr;
        }
    },
    initData() {
        return {
            reverse: false,
            mode: 'left',
            labelClass: ''
        };
    },
    updated() {
        const reverse = this.data.get('reverse');
        const hasPending = this.data.get('hasPending');
        const lastClasses = `${prefixCls}-item-last`;

        this.items.forEach((child, index) => {
            if (child.data.get('label')) {
                this.data.set('labelClass', `${prefixCls}-label`);
            }
            const className = [
                !reverse && !!hasPending
                    ? index === this.items.length - 2
                        ? lastClasses : ''
                    : index === this.items.length - 1
                        ? lastClasses : '',
                this.getPositionCls(child, index)
            ].join(' ');
            child.data.set('class', className);
        });
    },
    inited() {
        this.items = [];
        this.data.set('hasPending', !!this.sourceSlots.named.pending);
        this.data.set('hasPendingDot', !!this.sourceSlots.named.pendingDot);

        this.watch('reverse', val => {
            this.sourceSlots.noname = this.sourceSlots.noname.reverse();
            this._repaintChildren();
        });
    },
    attached() {
        this.updated();
    },
    getPositionCls(child, index) {
        const mode = this.data.get('mode');
        const position = child.data.get('position');

        if (mode) {
            return mode === 'alternate'
                ? position
                    ? `${prefixCls}-item-${position}`
                    : index % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`
                : `${prefixCls}-item-${mode}`;
        }
        return position === 'right' ? `${prefixCls}-item-right` : '';
    },
    messages: {
        santd_timeline_addItem(payload) {
            this.items.push(payload.value);
        }
    },
    components: {
        's-item': Item,
        's-icon': Icon
    },
    template: `
        <ul class="{{classes}} {{labelClass}}">
            <template s-if="!reverse">
                <slot />
                <s-item s-if="hasPending" pending="{{hasPending}}">
                    <slot name="pending" />
                    <slot name="pendingDot" slot="dot" s-if="hasPendingDot" />
                    <s-icon type="loading" slot="dot" s-else />
                </s-item>
            </template>
            <template s-else>
                <s-item s-if="hasPending" pending="{{hasPending}}">
                    <slot name="pending" />
                    <slot name="pendingDot" slot="dot" s-if="hasPendingDot" />
                    <s-icon type="loading" slot="dot" s-else />
                </s-item>
                <slot />
            </template>
        </ul>
    `
});
