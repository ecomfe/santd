/**
 * @file Santd cascader source file
 * @author mayihui@baidu.com
 **/


import san from 'san';
import Trigger from '../../core/trigger/index';
import placements from './placements';
import Menus from './menus';
import {classCreator} from '../../core/util';
import arrayTreeFilter from './arraytreefilter';

const prefixCls = classCreator('cascader')();

export default san.defineComponent({
    initData() {
        return {
            popupAlign: {},
            disabled: false,
            placement: 'bottomLeft',
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
    },
    inited() {
        this.data.set('activeValue', this.data.set('value') || this.data.get('defaultValue') || []);
        this.watch('popupVisible', val => {
            if (val) {
                const value = this.data.get('value');
                value && this.data.set('activeValue', value);
            }
        });
    },
    computed: {
        popupVisible() {
            const disabled = this.data.get('disabled');
            return disabled ? false : this.data.get('visible');
        }
    },
    getFieldName(name) {
        const fieldNames = this.data.get('fieldNames');
        const defaultFieldNames = this.data.get('defaultFieldNames');

        return fieldNames[name] || defaultFieldNames[name];
    },
    getActiveOptions(values) {
        const activeValue = values || this.data.get('activeValue');
        const options = this.data.get('options');
        return arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value')] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    },
    setPopupVisible(visible) {
        this.data.set('popupVisible', visible);
        this.fire('visibleChange', visible);
        if (visible && !this.data.get('popupVisible')) {
            this.data.set('activeValue', this.data.get('value'));
        }
    },
    handleChange(options, props, e) {
        if (e.type !== 'keydown') {
            this.fire('change', {
                value: options.map(o => o[this.getFieldName('value')]),
                selectedOptions: options
            });
            this.setPopupVisible(props.visible);
        }
    },
    handleMenuSelect(targetOption, menuIndex, e) {
        const {
            changeOnSelect,
            loadData,
            expandTrigger
        } = this.data.get();

        if (!targetOption || targetOption.disabled) {
            return;
        }

        let activeValue = this.data.get('activeValue');
        activeValue = activeValue.slice(0, menuIndex + 1);
        activeValue[menuIndex] = targetOption[this.getFieldName('value')];
        const activeOptions = this.getActiveOptions(activeValue);
        if (targetOption.isLeaf === false && !targetOption[this.getFieldName('children')] && loadData) {
            if (changeOnSelect) {
                this.handleChange(activeOptions, {visible: true}, e);
            }
            this.data.set('activeValue', activeValue);
            loadData(activeOptions);
            return;
        }

        const children = targetOption[this.getFieldName('children')];
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
    },
    messages: {
        santd_cascader_menuClick(payload) {
            this.handleMenuSelect(
                payload.value.option,
                payload.value.index,
                payload.value.e
            );
        }
    },
    handleVisibleChange(visible) {
        this.fire('visibleChange', visible);
    },
    components: {
        's-trigger': Trigger,
        's-menus': Menus
    },
    template: `<span>
        <s-trigger
            prefixCls="${prefixCls}-menus"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{placement}}"
            popupAlign="{{popupAlign}}"
            popupTransitionName="{{transitionName}}"
            defaultPopupVisible="{{defaultVisible}}"
            getPopupContainer="{{getPopupContainer}}"
            mouseEnterDelay="{{mouseEnterDelay}}"
            mouseLeaveDelay="{{mouseLeaveDelay}}"
            popupClassName="{{overlayClassName}}"
            popupStyle="{{overlayStyle}}"
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
});
