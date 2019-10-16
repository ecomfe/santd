<text lang="cn">
#### 自定义图标
可以针对不同的节点定制图标。
</text>

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
            <s-icon slot="icon" type="smile-o" />
            <s-tree-node title="leaf" key="0-0-0">
                <s-icon slot="icon" type="meh-o" />
            </s-tree-node>
            <s-tree-node title="leaf" key="0-0-1">
                <s-icon slot="icon" type="{{selected ? 'frown' : 'frown-o'}}" />
            </s-tree-node>
        </s-tree-node>
    </s-tree>
  </div>
</template>
<script>
import Tree from 'santd/tree';
import Icon from 'santd/icon';

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-icon': Icon
    }
}
</script>
```
