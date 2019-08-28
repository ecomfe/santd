<text lang="cn">
#### 自定义选择项
通过 `rowSelection.selections` 自定义选择项，默认不显示下拉项，设为 `true` 时显示默认选择项。
</text>

```html
<template>
    <div>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            dataSource="{{data}}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
    });
}

export default {
    components: {
        's-table': table
    },
    initData() {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
            }, {
                title: 'Age',
                dataIndex: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
            }],
            data: data,
            rowSelection: {
                selectedRowKeys: [],
                hideDefaultSelections: true,
                selections: [{
                    key: 'all-data',
                    text: 'Select All Data.',
                    onSelect: this.handleSelectAll.bind(this)
                }, {
                    key: 'odd',
                    text: 'Select Odd Row.',
                    onSelect: this.handleSelectOdd.bind(this)
                }, {
                    key: 'even',
                    text: 'Select Even Row.',
                    onSelect: this.handleSelectEven.bind(this)
                }],
                onChange: this.handleSelectChange.bind(this)
            }
        }
    },
    handleSelectAll() {
        this.data.set('rowSelection.selectedRowKeys', [...Array(10).keys()]);
    },
    handleSelectOdd(changableRowKeys) {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 !== 0;
        });
        this.data.set('rowSelection.selectedRowKeys', newSelectedRowKeys);
    },
    handleSelectEven(changableRowKeys) {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            return index % 2 === 0;
        });
        this.data.set('rowSelection.selectedRowKeys', newSelectedRowKeys);
    },
    handleSelectChange(selectedRowKeys, selectedRows) {
        this.data.set('rowSelection.selectedRowKeys', selectedRowKeys);
    }
}
</script>
```
