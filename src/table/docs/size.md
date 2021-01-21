<text lang="cn">
#### 紧凑型
两种紧凑型的列表，小型列表只用于对话框内。
</text>

```html
<template>
    <div id="components-table-demo-size">
        <h4>Middle size table</h4>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            size="middle"
        ></s-table>
        <h4 style="margin-top: 16px;">Small size table</h4>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            size="small"
        ></s-table>
    </div>
</template>
<script>
import {Table} from 'santd';

export default {
    components: {
        's-table': Table
    },
    initData() {
        return {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Age',
                    dataIndex: 'age'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                }
            ],
            data: [
                {
                    key: '1',
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                }
            ]
        }
    },
}
</script>
```
