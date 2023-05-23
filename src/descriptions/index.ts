/**
 * @file Santd descriptions file
 * @author mayihui@baidu.com
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import ResponsiveObserve, {responsiveArray, Screens} from '../core/util/responsiveObserve';
const prefixCls = classCreator('descriptions')();
import * as I from './interface';
const defaultColumnMap = {
    xxl: 3,
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
};

class Item extends Base {
    static template = '<template></template>';
}

export default class Descriptions  extends Base<I.State> {
    public token!: string;

    initData(): I.State {
        return {
            size: 'default',
            bordered: false,
            layout: 'horizontal',
            column: defaultColumnMap,
            screens: {}
        };
    }

    attached() {
        const column = this.data.get('column');
        this.token = ResponsiveObserve.subscribe(screens => {
            if (typeof column !== 'object') {
                return;
            }
            this.data.set('screens', screens);
        });
    }

    disposed() {
        ResponsiveObserve.unsubscribe(this.token);
    }

    static computed = {
        classes(this: Descriptions) {
            const size = this.data.get('size');
            const bordered = this.data.get('bordered');
            let classArr = [prefixCls];

            size !== 'default' && classArr.push(`${prefixCls}-${size}`);
            bordered && classArr.push(`${prefixCls}-bordered`);

            return classArr;
        },
        getColumn(this: Descriptions) {
            const column: any = this.data.get('column');
            const screens: any = this.data.get('screens');

            if (typeof column === 'object') {
                for (let i = 0; i < responsiveArray.length; i++) {
                    const breakpoint = responsiveArray[i];
                    if (screens[breakpoint] && column[breakpoint] !== undefined) {
                        return column[breakpoint] || defaultColumnMap[breakpoint as keyof Screens];
                    }
                }
            }
            return typeof column === 'number' ? column : 3;
        }
    }

    inited(): void {
        const column = this.data.get('getColumn');
        let slots: any[] = this.sourceSlots.noname || [];
        let totalRowSpan = 0;
        let childrenArray = [];
        let columnArray: any[] = [];
        slots.filter(slot  => slot.tagName).forEach(slot => {
            // san 从 3.10.6 开始，删除了 hotspot 属性，因此这里要做兼容
            // 详见：https://github.com/baidu/san/commit/573c1b1b39129029af28478ff4e2a9087229647a
            const {label: labelIndex, span: spanIndex} = slot.hotspot ? slot.hotspot.props : slot._pi;

            slot.label = slot.props[labelIndex] && slot.props[labelIndex].expr.value;
            slot.span = slot.props[spanIndex] && slot.props[spanIndex].expr.value || 1;
            columnArray.push(slot);

            totalRowSpan += slot.props[spanIndex] ? slot.props[spanIndex].expr.value : 1;

            if (totalRowSpan >= column) {
                childrenArray.push(columnArray);
                columnArray = [];
                totalRowSpan = 0;
            }
        });

        if (columnArray.length > 0) {
            childrenArray.push(columnArray);
            columnArray = [];
        }
        this.data.set('childrenArray', childrenArray);
        childrenArray.forEach((children, i) => {
            children.forEach((child, j) => {
                this.sourceSlots.named[`slot_${i}_${j}`] = child.children;
            });
        });
    }

    getColSpan(i: number, j: number, child: {span: number | string}) {
        const childrenArray = this.data.get('childrenArray');
        const column = this.data.get('getColumn');
        const span = child.span;
        const isLast = i + 1 === childrenArray.length;
        const lastSpan = column - childrenArray[i].length + 1;
        if (isLast && childrenArray[i].length === j + 1) {
            return lastSpan;
        }
        return span || 1;
    }

    static template = `<div class="{{classes}}">
        <div class="${prefixCls}-title" s-if="title">{{title}}</div>
        <div class="${prefixCls}-view">
            <table>
                <tbody>
                    <template s-for="children, i in childrenArray">
                        <template s-if="layout === 'vertical'">
                            <tr class="${prefixCls}-row">
                                <template s-for="child, j in children">
                                    <td
                                        class="${prefixCls}-item-label"
                                        colspan="{{getColSpan(i, j, child) * 2 - 1}}" s-if="bordered"
                                    >
                                        {{child.label}}
                                    </td>
                                    <td colspan="{{getColSpan(i, j, child)}}" class="${prefixCls}-item" s-else>
                                        <span class="${prefixCls}-item-label">{{child.label}}</span>
                                    </td>
                                </template>
                            </tr>
                            <tr class="${prefixCls}-row">
                                <template s-for="child, j in children">
                                    <td
                                        class="${prefixCls}-item-content"
                                        colspan="{{getColSpan(i, j, child) * 2 - 1}}"
                                        s-if="bordered"
                                    >
                                        <slot name="slot_{{i}}_{{j}}" />
                                    </td>
                                    <td colspan="{{getColSpan(i, j, child)}}" class="${prefixCls}-item" s-else>
                                        <span class="${prefixCls}-item-content">
                                            <slot name="slot_{{i}}_{{j}}" />
                                        </span>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        <tr class="${prefixCls}-row" s-else>
                            <template s-for="child, j in children">
                                <template s-if="bordered">
                                    <th class="${prefixCls}-item-label {{!label && '${prefixCls}-item-no-label'}}">
                                        {{child.label}}
                                    </th>
                                    <td
                                        class="${prefixCls}-item-content"
                                        colspan="{{getColSpan(i, j, child) * 2 -1}}"
                                    >
                                        <slot name="slot_{{i}}_{{j}}" />
                                    </td>
                                </template>
                                <td colspan="{{getColSpan(i, j, child)}}" class="${prefixCls}-item" s-else>
                                    <span class="${prefixCls}-item-label">{{child.label}}</span>
                                    <span class="${prefixCls}-item-content">
                                        <slot name="slot_{{i}}_{{j}}" />
                                    </span>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    <div>`;

    static Item = Item;
};