<codebox>
#### 固定头和列
适合同时展示有大量数据和数据列。

> 固定列使用了 sticky 属性，浏览器支持情况可以参考[这里](https://caniuse.com/#feat=css-sticky)。

> 若列头与内容不对齐或出现列重复，请指定每一列的 th 的宽度 width。

> 建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            scroll="{{ {x: '1150px', y: '300px'} }}"
        >
            <a href="javascript:;" slot="action">Action</a>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import {Table} from 'santd';

const columns = [
{title: 'Name', width: '150px', dataIndex: 'name', key: 'name', left: '0px'},
{title: 'Age', width: '100px', dataIndex: 'age', key: 'age', left: '150px'},
{title: 'Column 1', dataIndex: 'address', key: '1', width: '100px'},
{title: 'Column 2', dataIndex: 'address', key: '2', width: '100px'},
{title: 'Column 3', dataIndex: 'address', key: '3', width: '100px'},
{title: 'Column 4', dataIndex: 'address', key: '4', width: '100px'},
{title: 'Column 5', dataIndex: 'address', key: '5', width: '100px'},
{title: 'Column 6', dataIndex: 'address', key: '6', width: '100px'},
{title: 'Column 7', dataIndex: 'address', key: '7', width: '100px'},
{title: 'Column 8', dataIndex: 'address', key: '8', width: '100px'},
{
    title: 'Action',
    key: 'operation',
    width: '100px',
    right: '0px',
    scopedSlots: {render: 'action'}
}];

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        key: i,
        name: `Edrward king ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export default {
    components: {
        's-table': Table
    },
    initData() {
        return {
            columns: columns,
            data: data
        }
    },
}
</script>
```
</codebox>
