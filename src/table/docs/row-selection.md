<text lang="cn">
#### 可选择
第一列是联动的选择框。
</text>

```html
<template>
    <div>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            data="{{data}}"
            on-change="onChange"
        >
            <a slot="name" href="javascript:;">{{text}}</a>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
export default {
    components: {
        's-table': table
    },
    initData() {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                scopedSlots: {render: 'name'}
            }, {
                title: 'Age',
                dataIndex: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
            }],
            data: [{
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }, {
                key: '4',
                name: 'Disabled User',
                age: 99,
                address: 'Sidney No. 1 Lake Park',
            }],
            rowSelection: {
                handleChange(selectedRowKeys, selectedRows) {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                getCheckboxProps(record) {
                    return {
                        disabled: record.name === 'Joe Black',
                        name: record.name
                    };
                }
            }
        }
    }
}
</script>
```
