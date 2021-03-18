<codebox>
#### 带边框
添加表格边框线，页头和页脚。

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            bordered="{{true}}"
        >
            <template slot="name">
                <a href="javascript:;">{{text}}</a>
            </template>
            <template slot="title">
                Header
            </template>
            <template slot="footer">
                Footer
            </template>
        </s-table>
    </div>
</template>
<script>
import {Table} from 'santd';

export default {
    components: {
        's-table': Table,
    },
    initData() {
        return {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    scopedSlots: {render: 'name'}
                },
                {
                    title: 'Cash Assets',
                    dataIndex: 'money',
                    className: 'column-money'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                }
            ],
            data: [{
                key: '1',
                name: 'John Brown',
                money: '￥300,000.00',
                address: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            }]
        }
    },
}
</script>
<style>
    th.column-money,
    td.column-money {
        text-align: right !important;
    }
</style>
```
</codebox>
