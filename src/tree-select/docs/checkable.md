<text lang="cn">
#### 可勾选
使用勾选框实现多选功能。
</text>

```html
<template>
    <div>
      <s-tree-select
          style="width: 300px;"
          treeCheckable
          dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
          treeData="{{treeData}}"
          treeDefaultExpandAll
          showCheckedStrategy="{{SHOW_PARENT}}"
          value="{{values}}"
          placeholder="Please select"
          on-change="onChange"
          labelInValue
      >
      </s-tree-select>
    </div>
</template>
<script>
import Tree from 'santd/tree';
import TreeSelect from 'santd/tree-select';

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0-key',
  children: [{
    title: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0-key',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1-key',
  children: [{
    title: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0-key',
  }, {
    title: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1-key',
  }, {
    title: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2-key',
  }],
}];

export default {
    components: {
        's-tree-select': TreeSelect
    },
    initData() {
        return {
            values: ['0-1'],
            treeData: treeData,
            SHOW_PARENT: TreeSelect.SHOW_PARENT
        }
    },
    onChange(values) {
        console.log('value is: ', values);
    }
}
</script>
```
