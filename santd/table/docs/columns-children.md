<cn>
#### 表头分组
`columns[n]` 可以内嵌 `children`，以渲染分组表头。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            size="middle"
            bordered="{{true}}"
            scroll="{{ {x: '130%', y: '240px'} }}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  fixed: 'left'
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    sorter: (a, b) => a.age - b.age
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100,
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }]
    }]
  }]
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  }]
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 80,
  fixed: 'right'
}];

const data = [];
for (let i = 0; i < 50; i++) {
    data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
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
