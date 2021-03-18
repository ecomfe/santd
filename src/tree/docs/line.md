<codebox>
#### 链接线
带连接线的树。

```html
<template>
  <div>
    <s-tree
        showLine="{{true}}"
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
import {Tree, Icon} from 'santd';

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-icon': Icon
    },
    onSelect({selectedKeys, info}) {
        console.log('selected', selectedKeys, info);
    }
}
</script>
```
</codebox>
