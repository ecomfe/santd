<cn>
#### 可展开
当表格内容较多不能一次性完全展示时。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            expandedRowRender="{{expandedRowRender}}"
            on-expand="handleExpand"
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
    handleExpand(payload) {
        console.log(payload)
    },
    initData() {
        return {
            expandedRowRender() {
                return san.defineComponent({
                    template: `
                        <p>{{record.description}}</p>
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
