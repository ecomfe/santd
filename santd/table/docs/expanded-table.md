<cn>
#### 嵌套子表格
展示每行数据更详细的信息。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            expandedRowRender="{{expandedRowRender}}"
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
    initData() {
        return {
            expandedRowRender() {
                const columns = [
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' }
                ];
                const data = [];
                for (let i = 0; i < 3; ++i) {
                    data.push({
                        key: i,
                        date: '2014-12-24 23:12:00',
                        name: 'This is production name',
                        upgradeNum: 'Upgraded: 56',
                    });
                }
                return san.defineComponent({
                    components: {
                        's-table': table
                    },
                    initData() {
                        return {
                            columns: columns,
                            data: data
                        };
                    },
                    template: `
                        <div>
                            <s-table columns="{{columns}}" dataSource="{{data}}"></s-table>
                        </div>
                    `
                })
            },
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: 'Action',
                key: 'x',
                dataIndex: '',
                render() {
                    return san.defineComponent({
                        template: `
                            <a href="javascript:;">delete</a>
                        `
                    });
                }
            }],
            data: [
                {
                    key: '1',
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
                },
                {
                    key: '2',
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
                },
                {
                    key: '3',
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
                }
            ]
        }
    }
}
</script>
```
