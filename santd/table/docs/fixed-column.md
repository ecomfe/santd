<cn>
#### 固定列
对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。
需要指定 column 的 `width` 属性，否则列头和内容可能不对齐。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            scroll="{{ {x: '1300px'} }}"
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
}, { title: 'Column 1', dataIndex: 'address', key: '1' },
{ title: 'Column 2', dataIndex: 'address', key: '2' },
{ title: 'Column 3', dataIndex: 'address', key: '3' },
{ title: 'Column 4', dataIndex: 'address', key: '4' },
{ title: 'Column 5', dataIndex: 'address', key: '5' },
{ title: 'Column 6', dataIndex: 'address', key: '6' },
{ title: 'Column 7', dataIndex: 'address', key: '7' },
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
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park'
}, {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park'
}];

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
