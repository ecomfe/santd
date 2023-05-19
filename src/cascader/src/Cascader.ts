/**
 * @file Santd cascader source file
 * @author mayihui@baidu.com
 **/


import Base from 'santd/base';
import Trigger from '../../core/trigger/index';
import {placements} from './placements';
import Menus from './Menus';
import {classCreator} from '../../core/util';
import arrayTreeFilter from './arraytreefilter';
import {
    FieldNames,
    ExpandTrigger,
    DefaultOptionType,
    ValueType
} from '../interface';

interface Props {
    fieldNames?: FieldNames;
    defaultFieldNames?: FieldNames;
    expandIcon?: string;
    value?: ValueType;
    defaultValue?: ValueType;
    rootPrefixCls?: string;
}

interface State {
    popupAlign: Record<string, any>,
    disabled: boolean;
    builtinPlacements: typeof placements;
    expandTrigger: ExpandTrigger;
    trigger: ExpandTrigger;
    fieldNames: Required<FieldNames>;
    expandIcon: string;
    activeValue?: ValueType;
}

interface Computed {
    popupVisible: () => boolean;
}

interface Message {
    santd_cascader_menuClick: (
        this: Cascader,
        payload: {value: {
            option: DefaultOptionType,
            index: number,
            e: MouseEvent
        }}
    ) => void
}

const prefixCls = classCreator('cascader')();


export default class Cascader extends Base<State, Props> {
    initData(): State {
        return {
            popupAlign: {},
            disabled: false,
            builtinPlacements: placements,
            expandTrigger: 'click',
            trigger: 'click',
            fieldNames: {
                label: 'label',
                value: 'value',
                children: 'children'
            },
            expandIcon: '>'
        };
    }
    inited() {
        this.data.set('activeValue', this.data.get('value') || this.data.get('defaultValue') || []);
        this.watch('popupVisible', val => {
            if (val) {
                const value = this.data.get('value');
                value && this.data.set('activeValue', value);
            }
        });
    }
    static computed: Computed = {
        popupVisible(this: Cascader) {
            const disabled = this.data.get('disabled');
            return disabled ? false : this.data.get('visible');
        }
    }
    getFieldName(name: keyof FieldNames) {
        const fieldNames = this.data.get('fieldNames');
        const defaultFieldNames = this.data.get('defaultFieldNames');

        return fieldNames[name] || defaultFieldNames?.[name];
    }
    getActiveOptions(values: ValueType) {
        const activeValue = values || this.data.get('activeValue');
        const options = this.data.get('options');
        return arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value') as string] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    }
    setPopupVisible(visible: boolean) {
        this.data.set('popupVisible', visible);
        this.fire('visibleChange', visible);
        if (visible && !this.data.get('popupVisible')) {
            this.data.set('activeValue', this.data.get('value'));
        }
    }
    handleChange(options: DefaultOptionType[], props: {visible: boolean}, e: MouseEvent) {
        if (e.type !== 'keydown') {
            this.fire('change', {
                value: options.map(o => o[this.getFieldName('value') as string]),
                selectedOptions: options
            });
            this.setPopupVisible(props.visible);
        }
    }
    handleMenuSelect(targetOption: DefaultOptionType, menuIndex: number, e: MouseEvent) {
        const {
            changeOnSelect,
            loadData,
            expandTrigger
        } = this.data.get('');

        if (!targetOption || targetOption.disabled) {
            return;
        }

        let activeValue = this.data.get('activeValue') as NonNullable<State['activeValue']>;
        activeValue = activeValue.slice(0, menuIndex + 1);
        activeValue[menuIndex] = targetOption[this.getFieldName('value') as string];
        const activeOptions = this.getActiveOptions(activeValue);
        if (targetOption.isLeaf === false && !targetOption[this.getFieldName('children') as 'children'] && loadData) {
            if (changeOnSelect) {
                this.handleChange(activeOptions, {visible: true}, e);
            }
            this.data.set('activeValue', activeValue);
            loadData(activeOptions);
            return;
        }

        const children = targetOption[this.getFieldName('children') as 'children'];
        if (!children || !children.length) {
            this.handleChange(activeOptions, {visible: false}, e);
        }
        else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
            if (expandTrigger === 'hover') {
                this.handleChange(activeOptions, {visible: false}, e);
            }
            else {
                this.handleChange(activeOptions, {visible: true}, e);
            }
        }
        this.data.set('activeValue', activeValue);
    }
    static messages: Message = {
        santd_cascader_menuClick(payload) {
            this.handleMenuSelect(
                payload.value.option,
                payload.value.index,
                payload.value.e
            );
        }
    }
    handleVisibleChange(visible: boolean) {
        this.fire('visibleChange', visible);
    }
    static components = {
        's-trigger': Trigger,
        's-menus': Menus
    }
    static template = /* html */ `<span>
        <s-trigger
            prefixCls="${prefixCls}-menus"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{popupPlacement}}"
            popupAlign="{{popupAlign}}"
            popupTransitionName="{{transitionName}}"
            defaultPopupVisible="{{defaultVisible}}"
            getPopupContainer="{{getPopupContainer}}"
            mouseEnterDelay="{{mouseEnterDelay}}"
            mouseLeaveDelay="{{mouseLeaveDelay}}"
            popupClassName="{{popupClassName}}"
            popupStyle="{{popupStyle}}"
            action="{{disabled ? [] : trigger}}"
            visible="{{popupVisible}}"
            on-visibleChange="handleVisibleChange"
        >
            <slot />
            <s-menus slot="popup"
                prefixCls="{{rootPrefixCls}}"
                options="{{options || []}}"
                fieldNames="{{fieldNames}}"
                defaultFieldNames="{{defaultFieldNames}}"
                activeValue="{{activeValue}}"
                visible="{{visible}}"
                expandIcon="{{expandIcon}}"
                expandTrigger="{{expandTrigger}}"
                dropdownMenuColumnStyle="{{dropdownMenuColumnStyle}}"
            />
        </s-trigger>
    </span>`
};
