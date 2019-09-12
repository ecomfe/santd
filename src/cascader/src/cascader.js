/**
 * @file Santd cascader source file
 * @author mayihui@baidu.com
 **/


import san from 'san';
import inherits from '../../core/util/inherits';
import Trigger from '../../core/trigger/index';
import placements from './placements';
import Menus from './menus';
import {classCreator} from '../../core/util';
import arrayTreeFilter from './arraytreefilter';

const prefixCls = classCreator('cascader')();

export default inherits(san.defineComponent({
    initData() {
        return {
            disabled: false,
            popupPlacement: 'bottomLeft',
            builtinPlacements: placements,
            expandTrigger: 'click',
            fieldNames: {
                label: 'label',
                value: 'value',
                children: 'children'
            },
            expandIcon: '>'
        };
    },
    inited() {
        let initialValue;
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        initialValue = value || defaultValue || [];
        this.data.set('activeValue', initialValue);
        this.watch('popupVisible', val => {
            if (val) {
                const value = this.data.get('value');
                this.data.set('activeValue', value);
            }
        });
    },
    computed: {
        prefixCls() {
            const rootPrefixCls = this.data.get('rootPrefixCls');
            return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-menus';
        },
        popup() {
            const rootPrefixCls = this.data.get('rootPrefixCls');
            const options = this.data.get('options');
            const fieldNames = this.data.get('fieldNames');
            const defaultFieldNames = this.data.get('defaultFieldNames');
            const activeValue = this.data.get('activeValue');
            const popupVisible = this.data.get('popupVisible');
            const expandIcon = this.data.get('expandIcon');
            const expandTrigger = this.data.get('expandTrigger');
            const dropdownMenuColumnStyle = this.data.get('dropdownMenuColumnStyle');

            if (options && options.length > 0) {
                return inherits(san.defineComponent({
                    initData() {
                        return {
                            prefixCls: rootPrefixCls || prefixCls,
                            options,
                            fieldNames,
                            defaultFieldNames,
                            activeValue,
                            visible: popupVisible,
                            expandIcon,
                            expandTrigger,
                            dropdownMenuColumnStyle
                        };
                    }
                }), Menus);
            }
            return san.defineComponent({
                template: '<div></div>'
            });
        },
        popupVisible() {
            const disabled = this.data.get('disabled');
            return disabled ? false : this.data.get('visible');
        },
        action() {
            const disabled = this.data.get('disabled');
            return disabled ? [] : ['click'];
        },
        getTransitionName() {
            return this.data.get('transitionName');
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
    }
}), Trigger);
