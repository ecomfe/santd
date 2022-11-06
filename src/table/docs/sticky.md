<text lang="cn">
#### 头部支持 sticky
支持固定列头，并基于 sticky 属性将 Header 固定在顶部
</text>

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
    attached() {
        console.info('attached, sticky =', this.data.get('sticky'))
    },
    initData() {
        return {
            columns: columns,
            data: data,
            sticky: true
        }
    },
}
</script>
```
