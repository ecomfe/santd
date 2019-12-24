/**
 * @file Santd transfer list file
 * @author mayihui@baidu.com
 */
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Checkbox from '../checkbox';
import defaultRenderList from './renderListBody';
import Search from './search';

const prefixCls = classCreator('transfer')('list');

const matchFilter = function (item, filterValue, filterOption) {
    if (filterOption) {
        return filterOption(filterValue, item);
    }
    return item.title.indexOf(filterValue) >= 0;
};

export default san.defineComponent({
    dataTypes: {
        titleText: DataTypes.string,
        dataSource: DataTypes.array,
        filterOption: DataTypes.func,
        checkedKeys: DataTypes.array,
        showSearch: DataTypes.bool,
        searchPlaceholder: DataTypes.string,
        itemUnit: DataTypes.string,
        itemsUnit: DataTypes.string,
        disabled: DataTypes.bool,
        direction: DataTypes.string,
        showSelectAll: DataTypes.bool
    },
    initData() {
        return {
            filterValue: '',
            checkedKeys: []
        };
    },
    computed: {
        getFilteredItems() {
            const dataSource = this.data.get('dataSource');
            const filterValue = this.data.get('filterValue') || '';
            const filterOption = this.data.get('filterOption');
            const selectedKeys = this.data.get('checkedKeys') || [];

            return dataSource.filter(item => matchFilter(item, filterValue.trim(), filterOption))
                .map(item => {
                    item.checked = selectedKeys.includes(item.key);
                    return {...item};
                });
        },
        getCheckStatus() {
            const filteredItems = this.data.get('getFilteredItems');
            const checkedKeys = this.data.get('checkedKeys');
            if (checkedKeys.length === 0) {
                return 'none';
            }
            else if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
                return 'all';
            }
            return 'part';
        }
    },
    handleItemSelectAll() {
        const filteredItems = this.data.get('getFilteredItems');
        const getCheckStatus = this.data.get('getCheckStatus');
        const selectedKeys = filteredItems.filter(item => !item.disabled).map(({key}) => key);

        this.fire('itemSelectAll', {selectedKeys, checkAll: !(getCheckStatus === 'all')});
    },
    handleItemSelect(prop) {
        this.fire('itemSelect', prop);
    },
    handleScroll(e) {
        this.fire('scroll', e);
    },
    handleFilter(value) {
        this.data.set('filterValue', value);
        this.fire('filter', value);
    },
    handleClear() {
        this.data.set('filterValue', '');
        this.fire('clear');
    },
    components: {
        's-checkbox': Checkbox,
        's-search': Search,
        's-renderlist': defaultRenderList
    },
    messages: {
        santd_transfer_itemSelect(payload) {
            this.fire('itemSelect', payload.value);
        },
        santd_transfer_itemSelectAll(payload) {
            this.fire('itemSelectAll', {
                selectedKeys: payload.value.selectedKeys,
                checkAll: payload.value.checkAll
            });
        }
    },
    template: `<div class="${prefixCls} {{hasFooter ? '${prefixCls}-with-footer' : ''}}">
        <div class="${prefixCls}-header">
            <s-checkbox
                s-if="showSelectAll !== false"
                disabled="{{disabled}}"
                checked="{{getCheckStatus === 'all'}}"
                indeterminate="{{getCheckStatus === 'part'}}"
                on-change="handleItemSelectAll"
            />
            <span class="${prefixCls}-header-selected">
                <span>
                    {{checkedKeys.length > 0 ? checkedKeys.length + '/' : ''}}
                    {{getFilteredItems.length}} {{dataSource.length > 1 ? itemsUnit : itemUnit}}
                </span>
                <span class="${prefixCls}-header-title">{{titleText}}</span>
            </span>
        </div>
        <div class="${prefixCls}-body {{showSearch ? '${prefixCls}-body-with-search' : ''}}">
            <div s-if="showSearch" class="${prefixCls}-body-search-wrapper">
                <s-search
                    placeholder="{{searchPlaceholder}}"
                    value="{{filterValue}}"
                    disabled="{{disabled}}"
                    on-change="handleFilter"
                    on-clear="handleClear"
                />
            </div>
            <div class="${prefixCls}-body-customize-wrapper" s-if="hasRenderList">
                <slot
                    name="renderList"
                    var-direction="{{direction}}"
                    var-filteredItems="{{getFilteredItems}}"
                    var-disabled="{{disabled}}"
                    var-selectedKeys="{{checkedKeys}}"
                    var-targetKeys="{{targetKeys}}"
                />
            </div>
            <template s-else>
                <s-renderlist
                    s-if="getFilteredItems.length"
                    prefixCls="${prefixCls}"
                    direction="{{direction}}"
                    filteredItems="{{getFilteredItems}}"
                    disabled="{{disabled}}"
                    selectedKeys="{{checkedKeys}}"
                    targetKeys="{{targetKeys}}"
                    filteredRenderItems="{{getFilteredItems}}"
                    hasRender="{{hasRender}}"
                    on-itemSelect="handleItemSelect"
                    on-itemSelectAll="handleItemSelectAll"
                    on-scroll="handleScroll"
                ><slot name="render" var-item="{{item}}" /></s-renderlist>
                <div s-else class="${prefixCls}-body-not-found"><slot name="notfoundcontent" /></div>
            </template>
        </div>
        <div class="${prefixCls}-footer" s-if="hasFooter"><slot name="footer" /></div>
    </div>`
});
