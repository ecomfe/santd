/**
 * @file 组件 transfer
 * @author chenkai13 <chenkai13@baidu.com>
 */
import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import renderEmpty from 'santd/core/util/renderEmpty';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import inherits from 'santd/core/util/inherits';
import LocaleReceiver from 'santd/localeprovider/localereceiver';

const prefixCls = classCreator('transfer')();

const Transfer = san.defineComponent({
    computed: {
        classes() {
            const className = this.data.get('className');
            const disabled = this.data.get('disabled');
            const renderList = this.data.get('renderList');
            const prefixCls = this.data.get('prefixCls');

            return classNames(prefixCls, className, {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-customize-list`]: !!renderList
            });
        },
        getTitles() {
            const locale = this.data.get('locale');
            const titles = this.data.get('titles') || (locale && locale.titles);
            return titles || ['', ''];
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
        },
        leftActive() {
            const targetSelectedKeys = this.data.get('targetSelectedKeys');
            return targetSelectedKeys.length > 0;
        },
        rightActive() {
            const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
            return sourceSelectedKeys.length > 0;
        }
    },
    initData() {
        return {
            prefixCls,
            showSelectAll: true,
            notFoundContent: renderEmpty('Transfer'),
            sourceSelectedKeys: [],
            targetSelectedKeys: [],
            operations: []
        };
    },
    inited() {
        this.data.set('instance', this);
    },
    getSelectedKeysName(direction) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    },
    handleSelectChange(direction, holder) {
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');

        if (direction === 'left') {
            this.fire('selectChange', {sourceSelectedKeys: holder, targetSelectedKeys});
        }
        else {
            this.fire('selectChange', {targetSelectedKeys: holder, sourceSelectedKeys});
        }
    },
    handleItemSelect(direction, selectedKey, checked) {
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');

        const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
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
    components: {
        's-list': List,
        's-operation': Operation
    },
    template: `<div class="{{classes}}">
        <s-list
            prefixCls="{{prefixCls}}-list"
            titleText="{{getTitles[0]}}"
            dataSource="{{separateDataSource.leftDataSource}}"
            filterOption="{{filterOption}}"
            style="{{listStyle}}"
            checkedKeys="{{sourceSelectedKeys}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            showSearch="{{showSearch}}"
            body="{{body}}"
            renderList="{{renderList}}"
            footer="{{footer}}"
            disabled="{{disabled}}"
            direction="left"
            showSelectAll="{{showSelectAll}}"
            notFoundContent="{{notFoundContent}}"
            searchPlaceholder="{{locale.searchPlaceholder}}"
            itemUnit="{{locale.itemUnit}}"
            itemsUnit="{{locale.itemsUnit}}"
            on-itemSelect="handleLeftItemSelect"
            on-itemSelectAll="handleLeftItemSelectAll"
            on-scroll="handleScroll('left', $event)"
            on-filter="handleLeftFilter"
            on-clear="handleLeftClear"
        />
        <s-operation
            className="{{prefixCls}}-operation"
            rightActive="{{rightActive}}"
            rightArrowText="{{operations[0]}}"
            leftActive="{{leftActive}}"
            leftArrowText="{{operations[1]}}"
            style="{{operationStyle}}"
            disabled="{{disabled}}"
            on-moveToLeft="handleMoveTo('left')"
            on-moveToRight="handleMoveTo('right')"
        />
        <s-list
            prefixCls="{{prefixCls}}-list"
            titleText="{{getTitles[1]}}"
            dataSource="{{separateDataSource.rightDataSource}}"
            filterOption="{{filterOption}}"
            style="{{listStyle}}"
            checkedKeys="{{targetSelectedKeys}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            showSearch="{{showSearch}}"
            body="{{body}}"
            footer="{{footer}}"
            renderList="{{renderList}}"
            disabled="{{disabled}}"
            direction="right"
            showSelectAll="{{showSelectAll}}"
            notFoundContent="{{notFoundContent}}"
            searchPlaceholder="{{locale.searchPlaceholder}}"
            itemUnit="{{locale.itemUnit}}"
            itemsUnit="{{locale.itemsUnit}}"
            on-itemSelect="handleRightItemSelect"
            on-itemSelectAll="handleRightItemSelectAll"
            on-scroll="handleScroll('right', $event)"
            on-filter="handleRightFilter"
            on-clear="handleRightClear"
        />
    </div>`
});

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Transfer'
        };
    }
}), LocaleReceiver);

export default inherits(Locale, Transfer);

/*export default inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'Transfer'
        };
    }
}), Transfer);*/
