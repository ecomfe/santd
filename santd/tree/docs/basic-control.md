<cn>
#### 受控操作示例

受控操作示例
</cn>

```html
<template>
  <div>
    <s-tree
        checkable
        treeNodeData = "{{data}}"
        expandedKeys="{{['0-0-0', '0-0-1']}}"
        autoExpandParent="{{true}}"
        checkedKeys="{{['0-0-0']}}"
        selectedKeys="{{['0-0-0-0']}}"
        on-select="onSelect"
        on-expand="onExpand"
        on-check="onCheck"
    >
    </s-tree>
  </div>
</template>
<script>
import san from 'san';
import Tree from 'santd/tree';

const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}];

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode
    },
    initData() {
        return {
            data: treeData
        }
    },
    onSelect(val) {
        console.log('select item is:', val);
    },
    onExpand(value) {
        console.log('expand: ', value);
    },
    onCheck(value) {
        console.log('on-check', value);
    }
}
</script>
```
