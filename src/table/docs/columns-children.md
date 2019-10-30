<text lang="cn">
#### 表头分组
`columns[n]` 可以内嵌 `children`，以渲染分组表头。
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
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
  width: '100px',
  left: '0px'
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '200px',
    sorter: (a, b) => a.age - b.age
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: '200px'
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: '100px',
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: '100px',
      }]
    }]
  }]
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
    width: '200px'
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    width: '200px'
  }]
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: '100px',
  right: '0px'
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
