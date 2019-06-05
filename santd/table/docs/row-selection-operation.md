<cn>
#### 选择和操作
选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项。
</cn>

```html
<template>
    <div>
        <div style="margin-bottom: 16px;">
            <s-button
                type="primary"
                on-click="handleStart"
                disabled="{{!hasSelected}}"
                loading="{{loading}}"
            >
                Reload
            </s-button>
            <span style="margin-left: 8px;">
                {{hasSelected ? 'Selected ' + rowSelection.selectedRowKeys.length + ' items' : ''}}
            </span>
        </div>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            dataSource="{{data}}"
        ></s-table>
        </div>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
import button from 'santd/button';

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
        's-table': table,
        's-button': button
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
            loading: false,
            data: data,
            rowSelection: {
                selectedRowKeys: [],
                onChange: this.handleSelectChange.bind(this)
            }
        }
    },
    handleSelectChange(selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys: changed: ', selectedRowKeys);
        this.data.set('rowSelection.selectedRowKeys', selectedRowKeys);
    },
    handleStart() {
        this.data.set('loading', true);
        window.setTimeout(() => {
            this.data.set('rowSelection.selectedRowKeys', []);
            this.data.set('loading', false);
        }, 1000);
    },
    computed: {
        hasSelected() {
            return this.data.get('rowSelection.selectedRowKeys').length > 0;
        }
    }
}
</script>
```
