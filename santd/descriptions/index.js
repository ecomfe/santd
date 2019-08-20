/**
 * @file Santd descriptions file
 * @author mayihui@baidu.com
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import ResponsiveObserve, {responsiveArray} from '../core/util/responsiveObserve';
const prefixCls = classCreator('descriptions')();

const defaultColumnMap = {
    xxl: 3,
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
};

const Item = san.defineComponent({
    template: '<template></template>'
});

const Descriptions = san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        bordered: DataTypes.bool,
        size: DataTypes.string,
        title: DataTypes.string,
        column: DataTypes.oneOfType([DataTypes.number, DataTypes.object]),
        layout: DataTypes.string
    },
    initData() {
        return {
            prefixCls,
            size: 'default',
            bordered: false,
            layou: 'horizontal',
            column: defaultColumnMap,
            screens: {}
        };
    },
    attached() {
        const column = this.data.get('column');
        this.token = ResponsiveObserve.subscribe(screens => {
            if (typeof column !== 'object') {
                return;
            }
            this.data.set('screens', screens);
        });
    },
    disposed() {
        ResponsiveObserve.unsubscribe(this.token);
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const size = this.data.get('size');
            const bordered = this.data.get('bordered');
            let classArr = [prefixCls];

            className && classArr.push(className);
            size !== 'default' && classArr.push(`${prefixCls}-${size}`);
            bordered && classArr.push(`${prefixCls}-bordered`);

            return classArr;
        },
        getColumn() {
            const column = this.data.get('column');
            const screens = this.data.get('screens');

            if (typeof column === 'object') {
                for (let i = 0; i < responsiveArray.length; i++) {
                    const breakpoint = responsiveArray[i];
                    if (screens[breakpoint] && column[breakpoint] !== undefined) {
                        return column[breakpoint] || defaultColumnMap[breakpoint];
                    }
                }
            }
            return typeof column === 'number' ? column : 3;
        },
        childrenArray() {
            const instance = this.data.get('instance');
            const column = this.data.get('getColumn');

            if (instance) {
                let slots = instance.sourceSlots.noname || [];
                let totalRowSpan = 0;
                let childrenArray = [];
                let columnArray = [];
                slots.filter(slot => slot.tagName).forEach(slot => {
                    const labelIndex = slot.hotspot.props.label;
                    const spanIndex = slot.hotspot.props.span;
                    slot.label = slot.props[labelIndex] && slot.props[labelIndex].raw;
                    slot.span = slot.props[spanIndex] && slot.props[spanIndex].raw || 1;
                    columnArray.push(slot);

                    if (slot.props[spanIndex]) {
                        totalRowSpan += slot.props[spanIndex].expr.value;
                    }
                    else {
                        totalRowSpan += 1;
                    }

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
                childrenArray.forEach((children, i) => {
                    children.forEach((child, j) => {
                        instance.sourceSlots.named[`slot_${i}_${j}`] = child.children;
                    });
                });
                return childrenArray;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    getColSpan(i, j, child) {
        const childrenArray = this.data.get('childrenArray');
        const column = this.data.get('getColumn');
        const span = child.span;
        const isLast = i + 1 === childrenArray.length;
        const lastSpan = column - childrenArray[i].length + 1;
        if (isLast && childrenArray[i].length === j + 1) {
            return lastSpan;
        }
        return span || 1;
    },
    template: `<div class="{{classes}}">
        <div class="{{prefixCls}}-title" s-if="{{title}}">{{title}}</div>
        <div class="{{prefixCls}}-view">
            <table>
                <tbody>
                    <template s-for="children, i in childrenArray">
                        <template s-if="{{layout === 'vertical'}}">
                            <tr class="{{prefixCls}}-row">
                                <template s-for="child, j in children">
                                    <td
                                        class="{{prefixCls}}-item-label"
                                        colspan="{{getColSpan(i, j, child) * 2 - 1}}" s-if="{{bordered}}"
                                    >
                                        {{child.label}}
                                    </td>
                                    <td colspan="{{getColSpan(i, j, child)}}" class="{{prefixCls}}-item" s-else>
                                        <span class="{{prefixCls}}-item-label">{{child.label}}</span>
                                    </td>
                                </template>
                            </tr>
                            <tr class="{{prefixCls}}-row">
                                <template s-for="child, j in children">
                                    <td
                                        class="{{prefixCls}}-item-content"
                                        colspan="{{getColSpan(i, j, child) * 2 - 1}}"
                                        s-if="{{bordered}}"
                                    >
                                        <slot name="slot_{{i}}_{{j}}"></slot>
                                    </td>
                                    <td colspan="{{getColSpan(i, j, child)}}" class="{{prefixCls}}-item" s-else>
                                        <span class="{{prefixCls}}-item-content">
                                            <slot name="slot_{{i}}_{{j}}"></slot>
                                        </span>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        <tr class="{{prefixCls}}-row" s-else>
                            <template s-for="child, j in children">
                                <template s-if="{{bordered}}">
                                    <th class="{{prefixCls}}-item-label {{className}} {{!label && prefixCls + '-item-no-label'}}">
                                        {{child.label}}
                                    </th>
                                    <td
                                        class="{{prefixCls}}-item-content {{className}}"
                                        colspan="{{getColSpan(i, j, child) * 2 -1}}"
                                    >
                                        <slot name="slot_{{i}}_{{j}}"></slot>
                                    </td>
                                </template>
                                <td colspan="{{getColSpan(i, j, child)}}" class="{{prefixCls}}-item" s-else>
                                    <span class="{{prefixCls}}-item-label">{{child.label}}</span>
                                    <span class="{{prefixCls}}-item-content">
                                        <slot name="slot_{{i}}_{{j}}"></slot>
                                    </span>
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    <div>`
});

Descriptions.Item = Item;

export default Descriptions;
