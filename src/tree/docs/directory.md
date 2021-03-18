<codebox>
#### 目录树
内置的目录树，`multiple` 模式支持 `ctrl(Windows)` / `command(Mac)` 复选。


```html
<template>
  <div>
    <s-tree-directory
        multiple="{{true}}"
        defaultExpandAll="{{true}}"
        on-select="onSelect"
        on-expand="onExpand"
    >
        <s-tree-node title="parent 0" key="0-0">
            <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            <s-tree-node title="leaf 0-0" key="0-0-0">
                <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            </s-tree-node>
            <s-tree-node title="leaf 0-1" key="0-0-1">
                <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            </s-tree-node>
        </s-tree-node>
        <s-tree-node title="parent 1" key="0-1">
            <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            <s-tree-node title="leaf 1-0" key="0-1-0">
                <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            </s-tree-node>
            <s-tree-node title="leaf 1-1" key="0-1-1">
                <s-icon type="{{isLeaf ? 'file' : expanded ? 'folder-open' : 'folder'}}" slot="icon" />
            </s-tree-node>
        </s-tree-node>
    </s-tree-directory>
  </div>
</template>
<script>
import {Tree, Icon} from 'santd';

export default {
    components: {
        's-tree-directory': Tree.Directory,
        's-tree-node': Tree.TreeNode,
        's-icon': Icon
    },
    onSelect({selectedKeys, info}) {
        console.log('Trigger slected', selectedKeys, info);
    },
    onExpand() {
        console.log('Trigger Expand');
    }
}
</script>
```
</codebox>
