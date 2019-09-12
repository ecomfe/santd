<text lang="cn">
#### 固定头和列
适合同时展示有大量数据和数据列。
需要指定 column 的 `width` 属性，否则列头和内容可能不对齐。
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            scroll="{{ {x: '1500px', y: '300px'} }}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';

const columns = [{
    title: 'Full Name', width: '100px', dataIndex: 'name', key: 'name', fixed: 'left',
}, {
    title: 'Age', width: '100px', dataIndex: 'age', key: 'age', fixed: 'left',
}, { title: 'Column 1', dataIndex: 'address', key: '1', width: '150px' },
{ title: 'Column 2', dataIndex: 'address', key: '2', width: '150px' },
{ title: 'Column 3', dataIndex: 'address', key: '3', width: '150px' },
{ title: 'Column 4', dataIndex: 'address', key: '4', width: '150px' },
{ title: 'Column 5', dataIndex: 'address', key: '5', width: '150px' },
{ title: 'Column 6', dataIndex: 'address', key: '6', width: '150px' },
{ title: 'Column 7', dataIndex: 'address', key: '7', width: '150px' },
{ title: 'Column 8', dataIndex: 'address', key: '8' },
{
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: '100px',
    render: () => san.defineComponent({
        template: `<a href="javascript:;">action</a>`
    })
}];

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

export default {
    components: {
        's-table': table
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
