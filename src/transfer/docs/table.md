<text lang="cn">
#### 表格穿梭框
使用 Table 组件作为自定义渲染列表。
</text>

```html
<template>
    <div>
        <s-transfer
            disabled="{{disabled}}"
            dataSource="{{mockData}}"
            sourceKeys="{{sourceKeys}}"
            targetKeys="{{targetKeys}}"
            showSelectAll="{{false}}"
            showSearch="{{showSearch}}"
            filterOption="{{filterOption}}"
            on-change="handleChange"
        >
            <s-transfertable
                slot="leftRenderList"
                direction="{{direction}}"
                filteredItems="{{filteredItems}}"
                selectedKeys="{{selectedKeys}}"
                disabled="{{disabled}}"
                itemSelect="{{itemSelect}}"
                itemSelectAll="{{itemSelectAll}}"
            >
            </s-transfertable>
            <s-transfertable
                slot="rightRenderList"
                direction="{{direction}}"
                filteredItems="{{filteredItems}}"
                selectedKeys="{{selectedKeys}}"
                disabled="{{disabled}}"
            />
        </s-transfer>
        <s-switch
            checkedChildren="disabled"
            unCheckedChildren="disabled"
            checked="{{disabled}}"
            on-change="handleDisable"
            style="margin-top: 16px"
        />
        <s-switch
            checkedChildren="showSearch"
            unCheckedChildren="showSearch"
            checked="{{showSearch}}"
            on-change="handleShowSearch"
            style="margin-top: 16px"
        />
    </div>
</template>
<script>
const mockTags = ['cat', 'dog', 'bird'];
const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: mockTags[i % 3],
    });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [{
    dataIndex: 'title',
    title: 'Name',
}, {
    dataIndex: 'tag',
    title: 'Tag',
    scopedSlots: {render: 'tag'}
}, {
    dataIndex: 'description',
    title: 'Description',
}];

const rightTableColumns = [{
    dataIndex: 'title',
    title: 'Name'
}];

import san from 'san';
import difference from 'lodash/difference';
import transfer from 'santd/transfer';
import Switch from 'santd/switch';
import Table from 'santd/table';
import Tag from 'santd/tag';

const transferTable = san.defineComponent({
    components: {
        's-table': Table,
        's-tag': Tag
    },
    initData() {
        return {
            rowSelection: {
                selectedRowKeys: [],
                handleSelect: this.handleSelectItem.bind(this),
                handleSelectAll: this.handleSelectAll.bind(this),
                getCheckboxProps(record) {
                    return {
                        disabled: record.disabled
                    };
                }
            }
        }
    },
    inited() {
        this.watch('selectedKeys', val => {
            this.data.set('rowSelection.selectedRowKeys', val);
        });

        this.watch('disabled', val => {
            this.data.set('rowSelection.getCheckboxProps', (record) => { 
                return { 
                    disabled: val || record.disabled
                }
            })
        })
    },
    computed: {
        columns() {
            const direction = this.data.get('direction');
            return direction === 'left' ? leftTableColumns : rightTableColumns;
        }
    },
    handleSelectAll(selectedRows, checked) {
        let itemSelectAll = this.data.get('itemSelectAll');
        itemSelectAll(selectedRows, checked);
        const treeSelectedKeys = selectedRows.map(({key}) => key);
        this.dispatch('santd_transfer_itemSelectAll', {selectedKeys: treeSelectedKeys, checkAll: checked});
    },
    handleSelectItem(record, checked) {
        let itemSelect = this.data.get('itemSelect');
        itemSelect(record.key, checked);
        this.dispatch('santd_transfer_itemSelect', {selectedKey: record.key, checked});
    },
    template: `<div>
        <s-table
            columns="{{columns}}"
            data="{{filteredItems}}"
            size="small"
            rowSelection="{{rowSelection}}"
        >
            <span slot="tag">
                <s-tag>{{text}}</s-tag>
            </span>
        </s-table>
    </div>`
});

export default {
    initData() {
        return {
            disabled: false,
            showSearch: false,
            mockData: mockData,
            targetKeys: originTargetKeys,
            selectedKeys: [],
            filterOption(inputValue, item) {
                return item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
            },
            itemSelect: (key, ischecked) => {
                console.log('itemSelect_key', key);
                console.log('itemSelect_ischecked', ischecked);
            },
            itemSelectAll: (key, ischecked) => {
                console.log('itemSelectAll_key', key);
                console.log('itemSelectAll_ischecked', ischecked);
            }

        };
    },
    components: {
        's-transfer': transfer,
        's-switch': Switch,
        's-transfertable': transferTable
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
        this.data.set('selectedKeys', []);
    },
    handleDisable(disable) {
        this.data.set('disabled', disable);
    },
    handleShowSearch(disable) {
        this.data.set('showSearch', disable);
    }
}
</script>
```
