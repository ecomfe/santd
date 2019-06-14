<cn>
#### 表格穿梭框
使用 Table 组件作为自定义渲染列表。
</cn>

```html
<template>
    <div>
        <s-transfer
            disabled="{{disabled}}"
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            renderList="{{renderList}}"
            showSelectAll="{{false}}"
            showSearch="{{showSearch}}"
            filterOption="{{filterOption}}"
            on-change="handleChange"
        />
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
    render() {
        return san.defineComponent({
            components: {
                's-tag': Tag
            },
            template: `<span><s-tag>{{text}}</s-tag></span>`
        });
    },
}, {
    dataIndex: 'description',
    title: 'Description',
}];

const rightTableColumns = [{
    dataIndex: 'title',
    title: 'Name',
}];

import san from 'san';
import difference from 'lodash/difference';
import transfer from 'santd/transfer';
import Switch from 'santd/switch';
import Table from 'santd/table';
import Tag from 'santd/tag';

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
            renderList() {
                return san.defineComponent({
                    components: {
                        's-table': Table
                    },
                    inited() {
                        this.data.set('instance', this);
                    },
                    computed: {
                        columns() {
                            const direction = this.data.get('direction');
                            return direction === 'left' ? leftTableColumns : rightTableColumns;
                        },
                        rowSelection() {
                            const disabled = this.data.get('disabled');
                            const selectedKeys = this.data.get('selectedKeys');
                            const instance = this.data.get('instance');
                            return {
                                getCheckboxProps(item) {
                                    return {
                                        disabled: disabled || item.disabled
                                    }
                                },
                                onSelectAll(selected, selectedRows) {
                                    const treeSelectedKeys = selectedRows
                                        .filter(item => !item.disabled)
                                        .map(({key}) => key);

                                    const diffKeys = selected
                                        ? difference(treeSelectedKeys, selectedKeys)
                                        : difference(selectedKeys, treeSelectedKeys);

                                    instance.fire('itemSelectAll', {selectedKey: diffKeys, checked: selected})
                                },
                                onSelect(params, selected) {
                                    instance.fire('itemSelect', {selectedKey: params.key, checked: selected});
                                },
                                selectedRowKeys: selectedKeys
                            }
                        }
                    },
                    template: `<div>
                        <s-table
                            columns="{{columns}}"
                            dataSource="{{filteredItems}}"
                            size="small"
                            rowSelection="{{rowSelection}}"
                        />
                    </div>`
                });
            }
        };
    },
    components: {
        's-transfer': transfer,
        's-switch': Switch
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
    },
    handleSearch(param) {
        console.log('on-search', param);
    },
    handleSelectChange({sourceSelectedKeys, targetSelectedKeys}) {
        this.data.set('selectedKeys', [...sourceSelectedKeys, ...targetSelectedKeys]);

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
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
