<text lang="cn">
#### 可勾选
使用勾选框实现多选功能。
</text>

```html
<template>
    <div>
      <s-tree-select
          style="width: 100%;"
          treeCheckable="{{true}}"
          dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
          treeData="{{treeData}}"
          treeDefaultExpandAll="{{true}}"
          showCheckedStrategy="{{SHOW_PARENT}}"
          placeholder="Please select"
          allowClear="{{true}}"
          treeCheckStrictly="{{false}}"
          value="{{value}}"
          on-change="onChange"
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
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    title: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    title: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    title: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}];

export default {
    components: {
        's-tree-select': TreeSelect
    },
    initData() {
        return {
            value: ['0-1'],
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
