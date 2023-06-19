/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import Item from './Item';
import Icon from '../icon';
import {ITimelineProps} from './interface';
interface ITimelineMessages {
    santd_timeline_addItem?: (this: Timeline, payload: {
        value: any;
    }) => void;
}

const prefixCls = classCreator('timeline')();

export default class Timeline extends Base<ITimelineProps, ITimelineMessages> {
    items?: Item[];
    _repaintChildren?: () => void;
    static Item = Item;
    static computed = {
        classes(this: Timeline) {
            const hasPending = this.data.get('hasPending');
            const reverse = this.data.get('reverse');
            const mode = this.data.get('mode');
            let classArr = [prefixCls];

            hasPending && classArr.push(`${prefixCls}-pending`);
            reverse && classArr.push(`${prefixCls}-reverse`);
            mode && classArr.push(`${prefixCls}-${mode}`);

            return classArr;
        }
    };
    initData(): ITimelineProps {
        return {
            reverse: false,
            mode: 'left',
            labelClass: ''
        };
    }
    updated() {
        const reverse = this.data.get('reverse');
        const hasPending = this.data.get('hasPending');
        const lastClasses = `${prefixCls}-item-last`;

        if (this.items?.length) {
            this.items.forEach((child, index) => {
                if (child.data.get('label')) {
                    this.data.set('labelClass', `${prefixCls}-label`);
                }
                const className = [
                    !reverse && !!hasPending
                        ? index === this.items!.length - 2
                            ? lastClasses : ''
                        : index === this.items!.length - 1
                            ? lastClasses : '',
                    this.getPositionCls(child, index)
                ].join(' ');
                child.data.set('class', className);
            });
        }
    }
    inited() {
        this.items = [];
        this.data.set('hasPending', !!this.sourceSlots.named.pending);
        this.data.set('hasPendingDot', !!this.sourceSlots.named.pendingDot);

        this.watch('reverse', () => {
            this.sourceSlots.noname = this.sourceSlots.noname.reverse();
            this._repaintChildren && this._repaintChildren();
        });
    }
    attached() {
        this.updated();
    }
    getPositionCls(child: Item, index: number) {  
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
    }
    static messages: ITimelineMessages = {
        santd_timeline_addItem(payload) {
            this.items?.push(payload.value);
        }
    };
    static components = {
        's-item': Item,
        's-icon': Icon
    };
    static template = `
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
    `;
};
