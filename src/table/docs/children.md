<codebox>
#### 树形数据展示
表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格。
可以通过设置 `indentSize` 以控制每一层的缩进宽度。

```html
<template>
    <div>
        checkStrictly: <s-switch on-change='onChange' defaultChecked="{{false}}"></s-switch >
        <s-table rowSelection="{{rowSelection}}" data="{{data}}"
        columns="{{columns}}" onExpandedRowsChange="{{onExpandedRowsChange}}"></s-table>
    </div>
</template>
<script>
import {Table, Switch} from 'santd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    }
];

const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]

        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
];

export default {
    components: {
        's-table': Table,
        's-switch': Switch
    },
    initData() {
        return {
            columns: columns,
            data: data,
            rowSelection: {
                checkStrictly: false,
                selectedRowKeys: []
            },
            onExpandedRowsChange: (item) => {
              console.log('onExpandedRowsChange', item)
            }
        }
    },

    onChange(checked) {
      let rowSelection = this.data.get('rowSelection');
      rowSelection.checkStrictly = checked;
      this.data.set('rowSelection', rowSelection);
    }
}
</script>
```
</codebox>
