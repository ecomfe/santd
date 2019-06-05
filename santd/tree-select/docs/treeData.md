<cn>
#### 从数据直接生成
使用 `treeData` 把 JSON 数据直接生成树结构。
</cn>

```html
<template>
  <div>
    <s-tree-select
        style="width: 300px;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeData="{{treeData}}"
        treeDefaultExpandAll
        value="{{['0-0']}}"
        placeholder="Please select"
        on-change="onChange"
    >
    </s-tree-select>
  </div>
</template>
<script>
import TreeSelect from 'santd/tree-select';

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}];


export default {
    components: {
        's-tree-select': TreeSelect
    },
    initData() {
        return {
            treeData: treeData
        }
    },
    onChange(value) {
        console.log('选择的单一值是: ', value);
    }
}
</script>
```
