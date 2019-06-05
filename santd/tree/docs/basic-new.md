<cn>
#### 基本
最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。
</cn>

```html
<template>
  <div>
    <s-tree
        checkable
        defaultExpandedKeys="{{['0-0-0', '0-0-1']}}"
        defaultSelectedKeys="{{['0-0-0', '0-0-1']}}"
        defaultCheckedKeys="{{['0-0-1']}}"
        on-select="onSelect"
        on-check="onCheck"
    >
        <s-tree-node title="parent 1" key="0-0">
            <s-tree-node title="parent 1-0" key="0-0-0" disabled>
                <s-tree-node title="leaf" key="0-0-0-0" disableCheckbox/>
                <s-tree-node title="leaf" key="0-0-0-1"/>
            </s-tree-node>
            <s-tree-node title="parent 1-1" key="0-0-1">
                <s-tree-node title="leaf001" key="0-0-1-0"/>
                <s-tree-node title="leaf002" key="0-0-2-0"/>
            </s-tree-node>
            <s-tree-node title="parent 1-2" key="0-0-2">
            </s-tree-node>
        </s-tree-node>
    </s-tree>
  </div>
</template>
<script>
import Tree from 'santd/tree';
export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode
    },
    onSelect(val) {
        console.log('select items: ', val)
    },
    onCheck(values) {
        console.log('check:', values)
    }
}
</script>
```
