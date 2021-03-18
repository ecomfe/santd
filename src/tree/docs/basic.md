<codebox>
#### 基本
最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。

```html
<template>
  <div>
    <s-tree
        checkable="{{true}}"
        defaultExpandedKeys="{{['0-0-0', '0-0-1']}}"
        defaultSelectedKeys="{{['0-0-0', '0-0-1']}}"
        defaultCheckedKeys="{{['0-0-0', '0-0-1']}}"
        on-select="onSelect"
        on-check="onCheck"
    >
        <s-tree-node title="parent 1" key="0-0">
            <s-tree-node title="parent 1-0" key="0-0-0" disabled="{{true}}">
                <s-tree-node title="leaf" key="0-0-0-0" disableCheckbox="{{true}}"/>
                <s-tree-node title="leaf" key="0-0-0-1"/>
            </s-tree-node>
            <s-tree-node title="parent 1-1" key="0-0-1">
                <s-tree-node key="0-0-1-0">
                    <span slot="title" style="color:#1890ff">sss</span>
                </s-tree-node>
            </s-tree-node>
        </s-tree-node>
    </s-tree>
  </div>
</template>
<script>
import {Tree} from 'santd';

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode
    },
    onSelect({selectedKeys, info}) {
        console.log('selected', selectedKeys, info);
    },
    onCheck({checkedKeys, info}) {
        console.log('onCheck', checkedKeys, info);
    }
}
</script>
```
</codebox>
