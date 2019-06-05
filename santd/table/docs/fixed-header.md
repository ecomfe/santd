<cn>
#### 固定表头
方便一页内展示大量数据。
需要指定 column 的 `width` 属性，否则列头和内容可能不对齐。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            scroll="{{ {y: '240px'} }}"
        ></s-table>
    </div>
</template>
<script>
import table from 'santd/table';
const data = [];
for (let i = 1; i < 101; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

export default {
    components: {
        's-table': table
    },
    initData() {
        return {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    width: 150
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    width: 150
                },
                {
                    title: 'Address',
                    dataIndex: 'address'
                }
            ],
            data: data
        }
    },
}
</script>
```
