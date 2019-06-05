<cn>
#### 筛选和排序
对某一列数据进行筛选，使用列的 `filters` 属性来指定需要筛选菜单的列，`onFilter` 用于筛选当前数据，`filterMultiple` 用于指定多选和单选。

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。`sorter: function(rowA, rowB) { ... }`， rowA、rowB 为比较的两个行数据。

`sortDirections: ['ascend' | 'descend']` 改变每列可用的排序方式，切换排序时按数组内容依次切换，设置在table props上时对所有列生效。

使用 `defaultSortOrder` 属性，设置列的默认排序顺序。
</cn>

```html
<template>
    <div>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            dataSource="{{data}}"
            on-change="handleChange"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
export default {
    components: {
        's-table': table
    },
    handleChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    },
    initData() {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                filters: [{
                    text: 'Joe',
                    value: 'Joe'
                }, {
                    text: 'Jim',
                    value: 'Jim'
                }, {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [{
                        text: 'Green',
                        value: 'Green'
                    }, {
                        text: 'Black',
                        value: 'Black'
                    }]
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
                defaultSortOrder: 'descend',
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
                filterMultiple: true,
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
```
