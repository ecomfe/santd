<codebox>
#### 自定义图标
可以针对不同的节点定制图标。

```html
<template>
  <div>
    <s-tree
        showIcon="{{true}}"
        defaultExpandAll="{{true}}"
        defaultSelectedKeys="{{['0-0-0']}}"
    >
        <s-icon type="down" slot="switcherIcon" />
        <s-tree-node title="parent 1" key="0-0">
            <s-icon slot="icon" type="smile"/>
            <s-tree-node title="leaf" key="0-0-0">
                <s-icon slot="icon" type="meh" />
            </s-tree-node>
            <s-tree-node title="leaf" key="0-0-1">
                <s-icon slot="icon" type="{{selected ? 'smile' : 'frown'}}" />
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
    }
}
</script>
```
</codebox>
