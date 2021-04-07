<text lang="cn">
#### 可选择
第一列是联动的选择框。可以通过 rowSelection.type 属性指定选择类型，默认为 checkbox。
</text>

```html
<template>
    <div>
         <s-group name="radiogroup" value="{{value}}" on-change="handleChange">
            <s-radio value="checkbox" >checkbox</s-radio>
            <s-radio value="radio" >radio</s-radio>
        </s-group>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            data="{{data}}"
        >
            <a slot="name" href="javascript:;">{{text}}</a>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import {Table, Radio} from 'santd';

export default {
    components: {
        's-table': Table,
        's-radio': Radio,
        's-group': Radio.Group,
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
                },
                type: 'checkbox'
            },
            value: 'checkbox'
        }
    },
    handleChange(e) {
        this.data.set('value', e.target.value);
        this.data.set('rowSelection.type', e.target.value);
    }
}
</script>
```
