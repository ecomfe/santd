<text lang="cn">
#### 可编辑行
带行编辑功能的表格。
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
        >
            <div slot="name">
                <s-input s-if="record.editable" style="margin: -5px 0;" value="{{text}}" on-change="handleChange($event, column, index)" />
                <template s-else>{{text}}</template>
            </div>
            <div slot="age">
                <s-input s-if="record.editable" style="margin: -5px 0;" value="{{text}}" on-change="handleChange($event, column, index)" />
                <template s-else>{{text}}</template>
            </div>
            <div slot="address">
                <s-input s-if="record.editable" style="margin: -5px 0;" value="{{text}}" on-change="handleChange($event, column, index)" />
                <template s-else>{{text}}</template>
            </div>
            <div class="editable-row-operations" slot="operation">
                <span s-if="record.editable">
                    <a on-click="handleSave(index)">Save</a>
                    <s-popconfirm title="Sure to cancel?" on-confirm="handleCancel(index)">
                        <a>Cancel</a>
                    </s-popconfirm>
                </span>
                <span s-else>
                    <a on-click="handleEdit(index)">Edit</a>
                </span>
            </div>
        </s-table>
    </div>
</template>
<script>
import Table from 'santd/table';
import Input from 'santd/input';
import Popconfirm from 'santd/popconfirm';

export default {
    components: {
        's-table': Table,
        's-input': Input,
        's-popconfirm': Popconfirm
    },
    handleEdit(key) {
        let data = this.data.get('data');
        const editable = data[key].editable || false;
        this.data.apply('data', (items) => {
            return items.map(item => {
                item.editable = item.key == key;
                return {
                    ...item
                };
            });
        });
    },
    handleCancel(key) {
        const data = this.data.get('data');
        const editable = data[key].editable || false;
        this.data.apply('data', (items) => {
            return items.map(item => {
                item.editable = item.key == key && false;
                return {
                    ...item
                };
            });
        });
    },
    handleChange(value, column, index) {
        const data = this.data.get('data');
        const newData = [...data];
        console.log(column);
        if (newData[index]) {
            newData[index][column.key] = value;
        }
        this.data.set('newData', newData);
    },
    handleSave(key) {
        const data = this.data.get('newData') || this.data.get('data');
        const newData = data.map(item => {
            item.editable = false;
            return {
                ...item
            };
        });
        this.data.set('data', newData);
    },
    initData() {
        const that = this;
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                scopedSlots: {render: 'name'}
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                scopedSlots: {render: 'age'}
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                scopedSlots: {render: 'address'}
            }, {
                title: 'Action',
                key: 'action',
                scopedSlots: {render: 'operation'}
            }],
            data: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0'
                }, {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1'
                }, {
                    key: '2',
                    name: 'Edward King 2',
                    age: '32',
                    address: 'London, Park Lane no. 2'
                }
            ]
        }
    }
}
</script>
```
