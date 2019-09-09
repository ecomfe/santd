/**
 * @file 组件 transfer
 * @author chenkai13 <chenkai13@baidu.com>
 */
import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Empty from '../empty';
import List from './list';
import Operation from './operation';
import inherits from '../core/util/inherits';
import LocaleReceiver from '../localeprovider/localereceiver';

const prefixCls = classCreator('transfer')();
const emptyPrefixCls = classCreator('empty')();

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Transfer'
        };
    }
}), LocaleReceiver);

export default san.defineComponent({
    computed: {
        ...Locale.prototype.computed,
        classes() {
            const disabled = this.data.get('disabled');
            const renderList = this.data.get('renderList');
            let classArr = [prefixCls];

            disabled && classArr.push(`${prefixCls}-disabled`);
            !!renderList && classArr.push(`${prefixCls}-customize-list`);
            return classArr;
        },
        separateDataSource() {
            const dataSource = this.data.get('dataSource');
            const rowKey = this.data.get('rowKey');
            const targetKeys = this.data.get('targetKeys') || [];
            const leftDataSource = [];
            const rightDataSource = new Array(targetKeys.length);

            dataSource.forEach(record => {
                if (rowKey) {
                    record.key = rowKey(record);
                }

                const indexOfKey = targetKeys.indexOf(record.key);
                if (indexOfKey !== -1) {
                    rightDataSource[indexOfKey] = record;
                }
                else {
                    leftDataSource.push(record);
                }
            });

            return {
                leftDataSource,
                rightDataSource
            };
        }
    },
    initData() {
        return {
            ...Locale.prototype.initData(),
            showSelectAll: true,
            sourceSelectedKeys: [],
            targetSelectedKeys: [],
            operations: []
        };
    },
    inited() {
        this.data.set('hasFooter', !!this.sourceSlots.named.footer);
    },
    getSelectedKeysName(direction) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    },
    handleSelectChange(direction, holder) {
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');
        this.fire('selectChange', direction === 'left'
            ? {sourceSelectedKeys: holder, targetSelectedKeys}
            : {targetSelectedKeys: holder, sourceSelectedKeys}
        );
    },
    handleItemSelect(direction, selectedKey, checked) {
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');

        const holder = direction === 'left' ? sourceSelectedKeys.slice(0) : targetSelectedKeys.slice(0);
        const index = holder.indexOf(selectedKey);
        if (index > -1) {
            holder.splice(index, 1);
        }
        if (checked) {
            holder.push(selectedKey);
        }
        this.handleSelectChange(direction, holder);

        this.data.set(this.getSelectedKeysName(direction), holder);
    },
    handleLeftItemSelectAll(params) {
        this.handleItemSelectAll('left', params.selectedKeys, params.checkAll);
    },
    handleRightItemSelectAll(params) {
        this.handleItemSelectAll('right', params.selectedKeys, params.checkAll);
    },
    handleItemSelectAll(direction, selectedKeys, checkAll) {
        const originalSelectedKeys = this.data.get(this.getSelectedKeysName(direction)) || [];

        let mergedCheckedKeys = [];
        if (checkAll) {
            // Merge current keys with origin key
            mergedCheckedKeys = Array.from(new Set([...originalSelectedKeys, ...selectedKeys]));
        }
        else {
            // Remove current keys from origin keys
            mergedCheckedKeys = originalSelectedKeys.filter(
                key => selectedKeys.indexOf(key) === -1,
            );
        }

        this.handleSelectChange(direction, mergedCheckedKeys);

        this.data.set(this.getSelectedKeysName(direction), mergedCheckedKeys);
    },
    handleLeftItemSelect({selectedKey, checked}) {
        this.handleItemSelect('left', selectedKey, checked);
    },
    handleRightItemSelect({selectedKey, checked}) {
        this.handleItemSelect('right', selectedKey, checked);
    },
    handleMoveTo(direction) {
        const targetKeys = this.data.get('targetKeys') || [];
        const dataSource = this.data.get('dataSource') || [];
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');
        const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
        // filter the disabled options
        const newMoveKeys = moveKeys.filter(
            key => !dataSource.some(data => !!(key === data.key && data.disabled))
        );
        // move items to target box
        const newTargetKeys = direction === 'right'
            ? newMoveKeys.concat(targetKeys)
            : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);

        // empty checked keys
        const oppositeDirection = direction === 'right' ? 'left' : 'right';
        this.data.set(this.getSelectedKeysName(oppositeDirection), []);

        this.handleSelectChange(oppositeDirection, []);
        this.fire('change', {targetKeys: newTargetKeys, direction, moveKeys: newMoveKeys});
    },
    handleScroll(direction, e) {
        this.fire('scroll', {direction, e});
    },
    handleLeftFilter(value) {
        this.handleFilter('left', value);
    },
    handleRightFilter(value) {
        this.handleFilter('left', value);
    },
    handleFilter(direction, value) {
        this.fire('searchChange', {direction, value});
        this.fire('search', {direction, value});
    },
    handleLeftClear() {
        this.handleClear('left');
    },
    handleRightClear() {
        this.handleClear('right');
    },
    handleClear(direction) {
        this.fire('search', {direction, value: ''});
    },
    getTitles(titles, index) {
        const locale = this.data.get('locale');
        return (titles || (locale && locale.titles) || [])[index] || '';
    },
    components: {
        's-list': List,
        's-operation': Operation,
        's-empty': Empty
    },
    template: `<div class="{{classes}}">
        <s-list
            titleText="{{getTitles(titles, 0)}}"
            dataSource="{{separateDataSource.leftDataSource}}"
            filterOption="{{filterOption}}"
            style="{{listStyle}}"
            checkedKeys="{{sourceSelectedKeys}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            showSearch="{{showSearch}}"
            body="{{body}}"
            renderList="{{renderList}}"
            hasFooter="{{hasFooter}}"
            disabled="{{disabled}}"
            direction="left"
            showSelectAll="{{showSelectAll}}"
            searchPlaceholder="{{locale.searchPlaceholder}}"
            itemUnit="{{locale.itemUnit}}"
            itemsUnit="{{locale.itemsUnit}}"
            on-itemSelect="handleLeftItemSelect"
            on-itemSelectAll="handleLeftItemSelectAll"
            on-scroll="handleScroll('left', $event)"
            on-filter="handleLeftFilter"
            on-clear="handleLeftClear"
        >
            <slot name="footer" slot="footer" />
            <s-empty slot="notfoundcontent" image="${Empty.PRESENTED_IMAGE_SIMPLE}" class="${emptyPrefixCls}-small"/>
        </s-list>
        <s-operation
            class="${prefixCls}-operation"
            rightActive="{{sourceSelectedKeys.length > 0}}"
            rightArrowText="{{operations[0]}}"
            leftActive="{{targetSelectedKeys.length > 0}}"
            leftArrowText="{{operations[1]}}"
            style="{{operationStyle}}"
            disabled="{{disabled}}"
            on-moveToLeft="handleMoveTo('left')"
            on-moveToRight="handleMoveTo('right')"
        />
        <s-list
            titleText="{{getTitles(titles, 1)}}"
            dataSource="{{separateDataSource.rightDataSource}}"
            filterOption="{{filterOption}}"
            style="{{listStyle}}"
            checkedKeys="{{targetSelectedKeys}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            showSearch="{{showSearch}}"
            body="{{body}}"
            hasFooter="{{hasFooter}}"
            renderList="{{renderList}}"
            disabled="{{disabled}}"
            direction="right"
            showSelectAll="{{showSelectAll}}"
            searchPlaceholder="{{locale.searchPlaceholder}}"
            itemUnit="{{locale.itemUnit}}"
            itemsUnit="{{locale.itemsUnit}}"
            on-itemSelect="handleRightItemSelect"
            on-itemSelectAll="handleRightItemSelectAll"
            on-scroll="handleScroll('right', $event)"
            on-filter="handleRightFilter"
            on-clear="handleRightClear"
        >
            <slot name="footer" slot="footer" />
            <s-empty slot="notfoundcontent" image="${Empty.PRESENTED_IMAGE_SIMPLE}" class="${emptyPrefixCls}-small"/>
        </s-list>
    </div>`
}, Locale);
