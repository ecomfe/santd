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
const defaultRender = function () {
    return null;
};

const isRenderResultPlainObject = function (result) {
    return result && Object.prototype.toString.call(result) === '[object Object]';
};

const renderItem = function (item, render = defaultRender) {
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
        renderedText: isRenderResultPlain ? renderResult.value : renderResult,
        renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
        item
    };
};

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
        body: DataTypes.func,
        renderList: DataTypes.func,
        footer: DataTypes.func,
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
            const filterValue = this.data.get('filterValue');
            const filterOption = this.data.get('filterOption');
            const selectedKeys = this.data.get('checkedKeys') || [];

            return dataSource.map(item => {
                item.checked = selectedKeys.includes(item.key);

                if (filterValue && filterValue.trim()
                    && !matchFilter(item, filterValue, filterOption)) {
                    return null;
                }

                return {
                    ...item
                };
            });
        },
        getCheckStatus() {
            const filteredItems = this.data.get('getFilteredItems');
            const checkedKeys = this.data.get('checkedKeys');
            if (checkedKeys.length === 0) {
                return 'none';
            }
            else if (filteredItems.every(item => {
                return checkedKeys.indexOf(item.key) >= 0 || !!item.disabled;
            })) {
                return 'all';
            }
            return 'part';
        },
        injectBodyNode() {
            const instance = this.data.get('instance');
            const dataSource = this.data.get('dataSource');
            const renderList = this.data.get('renderList');
            const direction = this.data.get('direction');

            let bodyContent = renderList ? renderList({direction}) : null;
            const customize = !!bodyContent;
            if (!customize) {
                bodyContent = defaultRenderList;
            }

            if (instance) {
                instance.components.bodycontent = bodyContent;

                return {
                    customize
                };
            }
        }
    },
    inited() {
        this.data.set('instance', this);
    },
    handleItemSelectAll() {
        const filteredItems = this.data.get('getFilteredItems').filteredItems;
        const getCheckStatus = this.data.get('getCheckStatus');
        const selectedKeys = filteredItems.filter(item => !item.disabled)
            .map(({key}) => key);

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
                    prefixCls="${prefixCls}-search"
                    placeholder="{{searchPlaceholder}}"
                    value="{{filterValue}}"
                    disabled="{{disabled}}"
                    on-change="handleFilter"
                    on-clear="handleClear"
                />
            </div>
            <div className="${prefixCls}-body-customize-wrapper" s-if="injectBodyNode.customize">
                <bodycontent
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
                ><slot name="render" var-item="{{item}}" /></bodycontent>
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
