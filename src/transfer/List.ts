/**
 * @file Santd transfer list file
 * @author mayihui@baidu.com
 */
import {classCreator} from '../core/util';
import Checkbox from '../checkbox';
import defaultRenderList from './RenderListBody';
import Search from './Search';
import Base from 'santd/base';
import {TransferItem, ListState,  ListProps, ListMessages} from './interface';

const prefixCls = classCreator('transfer')('list');

const matchFilter = function (item: TransferItem, filterValue: string, filterOption: (filterValue: string, item: TransferItem) => boolean) {
    if (filterOption) {
        return filterOption(filterValue, item);
    }
    return item.title.indexOf(filterValue) >= 0;
};

export default class List extends Base<ListState, ListProps> {
    initData() {
        return {
            filterValue: '',
            checkedKeys: []
        };
    }
    static computed = {
        getFilteredItems(this: List) {
            const dataSource = this.data.get('dataSource');
            const filterValue = this.data.get('filterValue') || '';
            const filterOption = this.data.get('filterOption');
            const selectedKeys = this.data.get('checkedKeys') || [];

            return dataSource.filter((item: TransferItem) => matchFilter(item, filterValue.trim(), filterOption))
                .map((item: TransferItem) => {
                    item.checked = selectedKeys.includes(item.key);
                    return {...item};
                });
        },
        getCheckStatus(this: List) {
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
    }
    handleItemSelectAll() {
        const filteredItems = this.data.get('getFilteredItems');
        const getCheckStatus = this.data.get('getCheckStatus');
        const selectedKeys = filteredItems.filter(item => !item.disabled).map(({key}) => key);

        this.fire('itemSelectAll', {selectedKeys, checkAll: !(getCheckStatus === 'all')});
    }
    handleItemSelect(prop: any) {
        this.fire('itemSelect', prop);
    }
    handleScroll(e: Event) {
        this.fire('scroll', e);
    }
    handleFilter(value: string) {
        this.data.set('filterValue', value);
        this.fire('filter', value);
    }
    handleClear() {
        this.data.set('filterValue', '');
        this.fire('clear');
    }
    static components = {
        's-checkbox': Checkbox,
        's-search': Search,
        's-renderlist': defaultRenderList
    }
    static messages: ListMessages = {
        santd_transfer_itemSelect(payload) {
            this.fire('itemSelect', payload.value);
        },
        santd_transfer_itemSelectAll(payload) {
            this.fire('itemSelectAll', {
                selectedKeys: payload.value.selectedKeys,
                checkAll: payload.value.checkAll
            });
        }
    }
    static template = `<div class="${prefixCls} {{hasFooter ? '${prefixCls}-with-footer' : ''}}">
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
};
