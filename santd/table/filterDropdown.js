/**
* @file thead部分，包括组件的过滤、排序
* @author fuqiangqiang@baidu.com
*/
/* eslint-disable fecs-camelcase */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Checkbox from 'santd/checkbox';
import popover from 'santd/popover';
import button from 'santd/button';
import Icon from 'santd/icon';
import Divider from 'santd/divider';

import Dropdown from 'santd/dropdown';
import Menu from 'santd/menu';
const pagin = classCreator('table');
const prefixCls = pagin();

const generateValueMaps = (items, maps = {}) => {
    (items || []).forEach(item => {
        maps[item.value.toString()] = item.value;
        generateValueMaps(item.children, maps);
    });
    return maps;
};

export default san.defineComponent({
    components: {
        's-icon': Icon,
        's-button': button,
        's-checkbox': Checkbox,
        's-divider': Divider,
        's-dropdown': Dropdown
    },
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}-column-filters`]: true
            });
        }
    },
    initData() {
        return {
            componentPropName: 's-table-dropdown',
            getPopupContainer() {
                return document.body;
            },
            menus: null
        };
    },
    inited() {
        this.filterValues = [];
    },
    handleConfirm() {
        const column = this.data.get('column');
        const selectedKeys = this.data.get('selectedKeys');
        const valueKeys = this.data.get('valueKeys');
        this.fire('confirm', {
            column,
            selectedKeys: column.filterDropdown ? selectedKeys : selectedKeys.map(key => valueKeys[key])
        });
    },
    created() {
        const dropdownPrefixCls = this.data.get('dropdownPrefixCls');
        const column = this.data.get('column');
        const valueKeys = generateValueMaps(column.filters);
        this.data.set('valueKeys', valueKeys);
        const that = this;
        const menus = san.defineComponent({
            components: {
                's-menu': Menu,
                's-menuitem': Menu.Item
            },
            initData() {
                return {
                    prefixCls: dropdownPrefixCls
                };
            },
            handleConfirm() {
                that.handleConfirm();
            },
            template: `
                <div class="${prefixCls}-filter-dropdown">
                    <s-menu
                        prefixCls="{{prefixCls}}-menu"
                        mode="vertical"
                    >
                    </s-menu>
                    <div class="${prefixCls}-filter-dropdown-btns">
                        <a class="${prefixCls}-filter-dropdown-link confirm" on-click="handleConfirm">确认</a>
                        <a class="${prefixCls}-filter-dropdown-link clear" on-click="handleClearFilters">重置</a>
                    </div>
                </div>
            `
        });
        this.data.set('menus', menus);
    },
    filterConfirm() {
        const column = this.data.get('column');
        column._filterChecked = this.filterValues;
        this.dispatch('getFiltersValue', {column: column});
        this.data.set('popoverVisible', false);
    },
    filterClear() {
        const column = this.data.get('column');
        column._filterChecked = [];
        this.dispatch('getFiltersValue', {column: column});
        this.data.set('isCheck', '0');
    },
    checkboxChange(value) {
        this.nextTick(() => {
            if (+this.checkVal === 1) {
                this.filterValues.push(value);
            } else {
                this.filterValues.splice(this.filterValues.findIndex(item => item === value), 1);
            }
        });
    },
    toggleSortOrder(type) {
        const column = this.data.get('column');
        this.dispatch('sortHandler', {type, column});
    },
    messages: {
        'UI:form-item-interact': function (obj) {
            this.checkVal = obj.value.fieldValue;
        }
    },
    handleFilter(e) {
    },
    template: `
        <div class="{{classes}}">
            <s-dropdown
                trigger="click"
                placement="bottom-start"
                getPopupContainer="{{getPopupContainer}}"
                visible="{{true}}"
                overlay="{{menus}}"
            >
                <s-icon type="filter" theme="filled" class="{{dropdownIconClass}}" on-click="handleFilter"></s-icon>
            </s-dropdown>
        </div>
    `
});
