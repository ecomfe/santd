<text lang="cn">
#### 链接线
带连接线的树。
</text>

```html
<template>
  <div>
    <s-tree
        showLine
        defaultExpandedKeys="{{['0-0-0']}}"
        on-select="onSelect"
    >
        <s-tree-node title="parent 1" key="0-0">
            <s-tree-node title="parent 1-0" key="0-0-0">
                <s-tree-node title="leaf" key="0-0-0-0" />
                <s-tree-node title="leaf" key="0-0-0-1" />
                <s-tree-node title="leaf" key="0-0-0-2" />
            </s-tree-node>
            <s-tree-node title="parent 1-1" key="0-0-1">
                <s-tree-node title="leaf" key="0-0-1-0" />
            </s-tree-node>
            <s-tree-node title="parent 1-2" key="0-0-2">
                <s-tree-node title="leaf" key="0-0-2-0" />
                <s-tree-node title="leaf" key="0-0-2-1" />
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
    onSelect(key) {
        console.log('selectKey: ', key);
    }
}
</script>
```
