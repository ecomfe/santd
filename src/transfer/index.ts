/**
 * @file 组件 transfer
 * @author chenkai13 <chenkai13@baidu.com>
 */
import './style/index.less';
import {classCreator} from '../core/util';
import Empty from '../empty';
import List from './List';
import Operation from './Operation';
import localeReceiver from '../locale-provider/receiver';
import Base from 'santd/base';
import {TransferItem, State} from './interface'

const prefixCls = classCreator('transfer')();
const emptyPrefixCls = classCreator('empty')();


export default class Transfer extends Base<State> {
    static computed = {
        customLocale(this: Transfer) {
            let locale = this.data.get('locale') || {};
            return {...localeReceiver.computed.locale.bind(this)(), ...locale};
        },
        classes(this: Transfer) {
            const disabled = this.data.get('disabled');
            const hasRenderList = this.data.get('hasLeftRenderList') || this.data.get('hsaRightRenderList');
            let classArr = [prefixCls];

            disabled && classArr.push(`${prefixCls}-disabled`);
            !!hasRenderList && classArr.push(`${prefixCls}-customize-list`);
            return classArr;
        },
        separateDataSource(this: Transfer) {
            const dataSource = this.data.get('dataSource');
            const rowKey = this.data.get('rowKey');
            const targetKeys = this.data.get('targetKeys') || [];
            const leftDataSource: TransferItem[] = [];
            const rightDataSource = new Array(targetKeys.length);

            dataSource.forEach((record: TransferItem) => {
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
    }

    initData(): State {
        return {
            componentName: 'Transfer',
            showSelectAll: true,
            sourceSelectedKeys: [],
            targetSelectedKeys: [],
            operations: []
        };
    }

    inited() {
        localeReceiver.inited.call(this);
        this.data.set('hasFooter', !!this.sourceSlots.named.footer);
        this.data.set('hasRender', !!this.sourceSlots.named.render);
        this.data.set('hasLeftRenderList', !!this.sourceSlots.named.leftRenderList);
        this.data.set('hasRightRenderList', !!this.sourceSlots.named.rightRenderList);
    }

    getSelectedKeysName(direction: string) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    }

    handleSelectChange(direction: string, holder: string[]) {
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');
        this.fire('selectChange', direction === 'left'
            ? {sourceSelectedKeys: holder, targetSelectedKeys}
            : {targetSelectedKeys: holder, sourceSelectedKeys}
        );
    }

    handleItemSelect(direction: string, selectedKey: string, checked: boolean) {
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
    }

    handleLeftItemSelectAll(params: {selectedKeys: string[], checkAll: boolean}) {
        this.handleItemSelectAll('left', params.selectedKeys, params.checkAll);
    }

    handleRightItemSelectAll(params: {selectedKeys: string[], checkAll: boolean}) {
        this.handleItemSelectAll('right', params.selectedKeys, params.checkAll);
    }

    handleItemSelectAll(direction: string, selectedKeys: string[], checkAll: boolean) {
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
    }

    handleLeftItemSelect({selectedKey, checked}: {selectedKey: string, checked: boolean}) {
        this.handleItemSelect('left', selectedKey, checked);
    }

    handleRightItemSelect({selectedKey, checked}: {selectedKey: string, checked: boolean}) {
        this.handleItemSelect('right', selectedKey, checked);
    }

    handleMoveTo(direction: string) {
        const targetKeys = this.data.get('targetKeys') || [];
        const dataSource = this.data.get('dataSource') || [];
        const sourceSelectedKeys = this.data.get('sourceSelectedKeys');
        const targetSelectedKeys = this.data.get('targetSelectedKeys');
        const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
        // filter the disabled options
        const newMoveKeys = moveKeys.filter(
            key => !dataSource.some((data: TransferItem) => !!(key === data.key && data.disabled))
        );
        // move items to target box
        const newTargetKeys = direction === 'right'
            ? newMoveKeys.concat(targetKeys)
            : targetKeys.filter((targetKey: string) => newMoveKeys.indexOf(targetKey) === -1);

        // empty checked keys
        const oppositeDirection = direction === 'right' ? 'left' : 'right';
        this.data.set(this.getSelectedKeysName(oppositeDirection), []);

        this.handleSelectChange(oppositeDirection, []);
        this.fire('change', {targetKeys: newTargetKeys, direction, moveKeys: newMoveKeys});
    }

    handleScroll(direction: string, e: Event) {
        this.fire('scroll', {direction, e});
    }

    handleLeftFilter(value: any) {
        this.handleFilter('left', value);
    }
    handleRightFilter(value: any) {
        this.handleFilter('left', value);
    }
    handleFilter(direction: string, value: any) {
        this.fire('searchChange', {direction, value});
        this.fire('search', {direction, value});
    }
    handleLeftClear() {
        this.handleClear('left');
    }
    handleRightClear() {
        this.handleClear('right');
    }
    handleClear(direction: string) {
        this.fire('search', {direction, value: ''});
    }

    getTitles(titles: string[], index: number) {
        const locale = this.data.get('locale') || {};
        return (titles || (locale && locale.titles) || [])[index] || '';
    }

    static components = {
        's-list': List,
        's-operation': Operation,
        's-empty': Empty
    }
    static template = `<div class="{{classes}}">
        <s-list
            titleText="{{getTitles(titles, 0)}}"
            dataSource="{{separateDataSource.leftDataSource}}"
            filterOption="{{filterOption}}"
            style="{{listStyle}}"
            checkedKeys="{{sourceSelectedKeys}}"
            targetKeys="{{targetKeys}}"
            showSearch="{{showSearch}}"
            body="{{body}}"
            hasRender="{{hasRender}}"
            hasRenderList="{{hasLeftRenderList}}"
            hasFooter="{{hasFooter}}"
            disabled="{{disabled}}"
            direction="left"
            showSelectAll="{{showSelectAll}}"
            searchPlaceholder="{{customLocale.searchPlaceholder}}"
            itemUnit="{{customLocale.itemUnit}}"
            itemsUnit="{{customLocale.itemsUnit}}"
            on-itemSelect="handleLeftItemSelect"
            on-itemSelectAll="handleLeftItemSelectAll"
            on-scroll="handleScroll('left', $event)"
            on-filter="handleLeftFilter"
            on-clear="handleLeftClear"
        >
            <slot name="render" slot="render" var-item="{{item}}" />
            <slot
                name="leftRenderList"
                slot="renderList"
                var-direction="{{direction}}"
                var-filteredItems="{{filteredItems}}"
                var-selectedKeys="{{selectedKeys}}"
                var-disabled="{{disabled}}"
                var-targetKeys="{{targetKeys}}"
            />
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
            showSearch="{{showSearch}}"
            body="{{body}}"
            hasFooter="{{hasFooter}}"
            hasRender="{{hasRender}}"
            hasRenderList="{{hasRightRenderList}}"
            disabled="{{disabled}}"
            direction="right"
            showSelectAll="{{showSelectAll}}"
            searchPlaceholder="{{customLocale.searchPlaceholder}}"
            itemUnit="{{customLocale.itemUnit}}"
            itemsUnit="{{customLocale.itemsUnit}}"
            on-itemSelect="handleRightItemSelect"
            on-itemSelectAll="handleRightItemSelectAll"
            on-scroll="handleScroll('right', $event)"
            on-filter="handleRightFilter"
            on-clear="handleRightClear"
        >
            <slot name="render" slot="render" var-item="{{item}}" />
            <slot
                name="rightRenderList"
                slot="renderList"
                var-direction="{{direction}}"
                var-filteredItems="{{filteredItems}}"
                var-selectedKeys="{{selectedKeys}}"
                var-disabled="{{disabled}}"
                var-targetKeys="{{targetKeys}}"
            />
            <slot name="footer" slot="footer" />
            <s-empty slot="notfoundcontent" image="${Empty.PRESENTED_IMAGE_SIMPLE}" class="${emptyPrefixCls}-small"/>
        </s-list>
    </div>`
};
