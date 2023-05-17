/**
 * @file Santd cascader menus file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import arrayTreeFilter from './arraytreefilter';
import {
    FieldNames,
    DefaultOptionType,
    ValueType,
    ExpandTrigger
} from '../interface';

interface Props {
    fieldNames?: FieldNames;
    defaultFieldNames?: FieldNames;
}

interface State {
    options: DefaultOptionType[];
    value: ValueType[];
    activeValue: ValueType[];
    prefixCls: 'cascader-menus';
    visible: boolean;
    expandTrigger: ExpandTrigger;
}

interface Computed {
    getActiveOptions: () => DefaultOptionType[];
    getShowOptions: () => DefaultOptionType[][];
}

export default class Menus extends Base<State, Props> {
    initData(): State {
        return {
            options: [],
            value: [],
            activeValue: [],
            prefixCls: 'cascader-menus',
            visible: false,
            expandTrigger: 'click'
        };
    }

    delayTimer!: NodeJS.Timer | null

    inited() {
        this.data.set('fieldNames', this.data.get('fieldNames') || this.data.get('defaultFieldNames') || {});
    }
    static computed: Computed = {
        getActiveOptions(this: Menus) {
            const activeValue = this.data.get('activeValue');
            const options = this.data.get('options');
            const fieldNames = this.data.get('fieldNames') as NonNullable<Props['fieldNames']>;

            return arrayTreeFilter(
                options,
                (o, level) => o[fieldNames.value as string] === activeValue[level],
                {childrenKeyName: fieldNames.children}
            );
        },
        getShowOptions(this: Menus) {
            const options = this.data.get('options');
            const fieldNames = this.data.get('fieldNames') as NonNullable<Props['fieldNames']>;
            const result: DefaultOptionType[] = this.data.get('getActiveOptions') || [];

            let childrenResult = result.map(
                activeOption => activeOption[fieldNames.children as 'children']
            ).filter(activeOption => !!activeOption);

            childrenResult.unshift(options);
            return childrenResult as DefaultOptionType[][];
        }
    }
    updated() {
        const options: DefaultOptionType[][] = this.data.get('getShowOptions');
        options.forEach((option, index) => {
            option.forEach((item: DefaultOptionType, subIndex: number) => {
                const ref = this.ref('option' + index + '-' + subIndex) as unknown as Element;
                ref.className = this.getMenuItemClass(item, index);
            });
        });
    }
    getFieldName(name: keyof FieldNames) {
        const fieldNames = this.data.get('fieldNames') as NonNullable<Props['fieldNames']>;

        return fieldNames[name];
    }
    getActiveOptions(values: ValueType[]) {
        const activeValue = values || this.data.get('activeValue');
        const options = this.data.get('options');
        return arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value') as string] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    }
    getLabel(option: DefaultOptionType, label: keyof FieldNames) {
        return option[this.getFieldName(label) as string];
    }
    isActiveOption(option: DefaultOptionType, menuIndex: number) {
        const activeValue = this.data.get('activeValue') || [];
        return activeValue[menuIndex] === option[this.getFieldName('value') as string];
    }
    getMenuItemClass(option: DefaultOptionType, index: number) {
        const prefixCls = this.data.get('prefixCls');
        const hasChildren = option[this.getFieldName('children') as string]
            && option[this.getFieldName('children') as string].length > 0;

        let classArr = [`${prefixCls}-menu-item`];
        (hasChildren || option.isLeaf === false) && classArr.push(`${prefixCls}-menu-item-expand`);
        this.isActiveOption(option, index) && classArr.push(`${prefixCls}-menu-item-active`);
        option.disabled && classArr.push(`${prefixCls}-menu-item-disabled`);
        option.loading && classArr.push(`${prefixCls}-menu-item-loading`);
        return classArr.join(' ');
    }
    getExpandIconNode(option: DefaultOptionType) {
        const hasChildren = option[this.getFieldName('children') as string]
            && option[this.getFieldName('children') as string].length > 0;

        if ((hasChildren || option.isLeaf === false) && !option.loading) {
            return true;
        }
        return false;
    }
    handleClick(e: MouseEvent, option: DefaultOptionType, index: number) {
        this.dispatch('santd_cascader_menuClick', {option, index, e});
    }
    handleMouseEnter(e: MouseEvent, option: DefaultOptionType, index: number) {
        const expandTrigger = this.data.get('expandTrigger');
        const hasChildren = option[this.getFieldName('children') as string]
            && option[this.getFieldName('children') as string].length > 0;

        if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
            this.delayHandleSelect(true, e, option, index);
        }
    }
    handleMouseLeave(_e: MouseEvent, option: DefaultOptionType, _index: number) {
        const expandTrigger = this.data.get('expandTrigger');
        const hasChildren = option[this.getFieldName('children') as string]
            && option[this.getFieldName('children') as string].length > 0;

        if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
            this.delayHandleSelect();
        }
    }
    delayHandleSelect(
        isEnter?: boolean,
        e?: MouseEvent,
        option?: DefaultOptionType,
        index?: number) {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
        // 如果isEnter 为 true，e等其他参数是必传的
        if (isEnter) {
            this.delayTimer = setTimeout(() => {
                this.handleClick(e as MouseEvent, option as DefaultOptionType, index as number);
                this.delayTimer = null;
            }, 150);
        }
    }
    static template = /* html */ `<div>
        <ul
            s-for="options, index in getShowOptions"
            class="{{prefixCls}}-menu"
            key="{{index}}"
            role="menuitem"
            style="{{dropdownMenuColumnStyle}}"
        >
            <li
                s-for="option, subIndex in options"
                key="{{getLabel(option, 'value')}}"
                class="{{getMenuItemClass(options, index)}}"
                on-click="handleClick($event, option, index)"
                on-mouseenter="handleMouseEnter($event, option, index)"
                on-mouseleave="handleMouseLeave($event, option, index)"
                s-ref="option{{index}}-{{subIndex}}"
            >
                {{getLabel(option, 'label') | raw}}
                <span class="{{prefixCls}}-menu-item-expand-icon" s-if="getExpandIconNode(option)">{{expandIcon}}</span>
            </li>
        </ul>
    </div>`
};
