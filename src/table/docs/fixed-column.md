<text lang="cn">
#### 固定列
对于列数很多的数据，可以使用 `columns` 中的 `left` 和 `right` 固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。

> 固定列使用了 sticky 属性，浏览器支持情况可以参考[这里](https://caniuse.com/#feat=css-sticky)。

> 若列头与内容不对齐或出现列重复，请指定每一列的 th 的宽度 width。

> 建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。

</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            scroll="{{ {x: '1300px'} }}"
        >
            <a href="javascript:;" slot="action">action</a>
        </s-table>
    </div>
</template>
<script>
import Table from 'santd/table';

const columns = [
{title: 'Full Name', width: '100px', dataIndex: 'name', key: 'name', left: '0px'},
{title: 'Age', width: '100px', dataIndex: 'age', key: 'age', left: '100px'},
{title: 'Column 1', dataIndex: 'address', key: '1'},
{title: 'Column 2', dataIndex: 'address', key: '2'},
{title: 'Column 3', dataIndex: 'address', key: '3'},
{title: 'Column 4', dataIndex: 'address', key: '4'},
{title: 'Column 5', dataIndex: 'address', key: '5'},
{title: 'Column 6', dataIndex: 'address', key: '6'},
{title: 'Column 7', dataIndex: 'address', key: '7'},
{title: 'Column 8', dataIndex: 'address', key: '8'},
{
    title: 'Action',
    key: 'operation',
    width: '100px',
    right: '0px',
    scopedSlots: {render: 'action'}
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
