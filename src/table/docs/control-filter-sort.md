<codebox>
#### 可控的筛选和排序
使用受控属性对筛选和排序状态进行控制。

> 1. columns 中赋值了 filteredValue 和 sortOrder 属性即视为受控模式。
> 2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。
> 3. 务必指定 column.key。

```html
<template>
    <div>
        <div class="table-operations">
            <s-button on-click="setAgeSort">Sort age</s-button>
            <s-button on-click="clearFilters">Clear filters</s-button>
            <s-button on-click="clearAll">Clear filters and sorters</s-button>
        </div>
        <s-table
            locale="{{locale}}"
            columns="{{columns}}"
            data="{{data}}"
            on-change="handleChange"
        ></s-table>
    </div>
</template>
<script>
import {Table, Button} from 'santd';

export default {
    components: {
        's-table': Table,
        's-button': Button
    },
    handleChange({pagination, filters, sorter}) {
        console.log('params', pagination, filters, sorter);
    },
    clearFilters() {
        let columns = this.data.get('columns');
        columns = columns.map((column, index) => {
            if (column.onFilter) {
                column.filteredValue = null;
            }
            return {
                ...column
            };
        });
        this.data.set('columns', columns);
    },
    clearAll() {
        let columns = this.data.get('columns');
        columns = columns.map(column => {
            delete column.sortOrder;
            if (column.onFilter) {
                column.filteredValue = null;
            }
            return {
                ...column
            };
        });

        this.data.set('columns', columns);
    },
    setAgeSort() {
        let columns = this.data.get('columns');
        columns = columns.map(column => {
            if (column.dataIndex === 'age') {
                column.sortOrder = 'descend';
            }
            return {
                ...column
            };
        });

        this.data.set('columns', columns);
    },
    initData() {
        return {
            filteredInfo: null,
            sortedInfo: null,
            locale: {
                emptyText: '暂无数据',
                filterConfirm: '确定',
                filterReset: '重置'
            },
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                filters: [{
                    text: 'Joe',
                    value: 'Joe'
                }, {
                    text: 'Jim',
                    value: 'Jim'
                }],
                onFilter(value, record) {
                    return record.name.indexOf(value) === 0;
                },
                sorter(a, b) {
                    return a.name.length - b.name.length;
                },
                sortDirections: ['descend']
            }, {
                title: 'Age',
                dataIndex: 'age',
                sorter(a, b) {
                    return a.age - b.age;
                }
            }, {
                title: 'Address',
                dataIndex: 'address',
                filters: [{
                    text: 'London',
                    value: 'London'
                }, {
                    text: 'New York',
                    value: 'New York'
                }],
                filterMultiple: false,
                onFilter(value, record) {
                    return record.address.indexOf(value) === 0;
                },
                sorter(a, b) {
                    return a.address.length - b.address.length;
                },
                sortDirections: ['descend', 'ascend']
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
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
            }]
        }
    }
}
</script>
<style>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
```
</codebox>
