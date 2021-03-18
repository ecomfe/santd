<codebox>
#### 可展开
当表格内容较多不能一次性完全展示时。

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            rowExpandable="{{rowExpandable}}"
            onExpandedRowsChange="{{onExpandedRowsChange}}"
        >
            <a slot="action" href="javascript:;">Delete</a>
            <p slot="expandedRowRender" style="margin: 0">{{record.description}}</p>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import {Table} from 'santd';

const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Age', dataIndex: 'age', key: 'age'},
    {title: 'Address', dataIndex: 'address', key: 'address'},
    {title: 'Action', dataIndex: '', key: 'x', scopedSlots: {render: 'action'}}
];

const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      key: 3,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
];

export default {
    components: {
        's-table': Table
    },
    initData() {
        return {
            columns,
            data,
            rowExpandable: (res) => {
                return res.name !== 'Joe Black';
            },
            onExpandedRowsChange: (item) => {
              console.log('item', item)
            }
        }
    }
}
</script>
```
</codebox>
