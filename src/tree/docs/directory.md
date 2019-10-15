<text lang="cn">
#### 目录树
内置的目录树，`multiple` 模式支持 `ctrl(Windows)` / `command(Mac)` 复选。

</text>

```html
<template>
  <div>
    <s-tree-directory
        multiple="{{true}}"
        blockNode="{{true}}"
        defaultExpandAll="{{true}}"
        expandAction="{{false}}"
        on-select="onSelect"
    >
        <s-tree-node title="parent 1" key="0-0">
            <s-tree-node title="parent 1-0" key="0-0-0">
                <s-tree-node title="leaf" key="0-0-0-0"/>
                <s-tree-node title="leaf" key="0-0-0-1"/>
            </s-tree-node>
            <s-tree-node title="parent 1-1" key="0-0-1">
                <s-tree-node title="leaf001" key="0-0-1-0"/>
                <s-tree-node title="leaf002" key="0-0-2-0"/>
            </s-tree-node>
        </s-tree-node>
    </s-tree-directory>
  </div>
</template>
<script>
import Tree from 'santd/tree';
export default {
    components: {
        's-tree-directory': Tree.Directory,
        's-tree-node': Tree.TreeNode
    },
    onSelect(value) {
        console.log('slected::::', value);
    }
}
</script>
```
