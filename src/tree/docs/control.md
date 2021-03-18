<codebox>
#### 受控操作示例

受控操作示例

```html
<template>
  <div>
    <s-tree
        checkable="{{true}}"
        expandedKeys="{{expandedKeys}}"
        autoExpandParent="{{autoExpandParent}}"
        checkedKeys="{{checkedKeys}}"
        selectedKeys="{{selectedKeys}}"
        on-select="onSelect"
        on-expand="onExpand"
        on-check="onCheck"
    >
        <s-tree-node title="0-0" key="0-0">
            <s-tree-node title="0-0-0" key="0-0-0">
                <s-tree-node title="0-0-0-0" key="0-0-0-0" />
                <s-tree-node title="0-0-0-1" key="0-0-0-1" />
                <s-tree-node title="0-0-0-2" key="0-0-0-2" />
            </s-tree-node>
            <s-tree-node title="0-0-1" key="0-0-1">
                <s-tree-node title="0-0-1-0" key="0-0-1-0" />
                <s-tree-node title="0-0-1-1" key="0-0-1-1" />
                <s-tree-node title="0-0-1-2" key="0-0-1-2" />
            </s-tree-node>
            <s-tree-node title="0-0-2" key="0-0-2" />
        </s-tree-node>
        <s-tree-node title="0-1" key="0-1">
            <s-tree-node title="0-1-0-0" key="0-1-0-0" />
            <s-tree-node title="0-1-0-1" key="0-1-0-1" />
            <s-tree-node title="0-1-0-2" key="0-1-0-2" />
        </s-tree-node>
        <s-tree-node title="0-2" key="0-2">
        </s-tree-node>
    </s-tree>
  </div>
</template>
<script>
import san from 'san';
import {Tree} from 'santd';

export default {
    initData() {
        return {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: []
        }
    },
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode
    },
    onSelect({selectedKeys, info}) {
        console.log('onSelect', info);
        this.data.set('selectedKeys', selectedKeys);
    },
    onExpand({expandedKeys, info}) {
        console.log('onExpand', expandedKeys);
        this.data.set('expandedKeys', expandedKeys);
        this.data.set('autoExpandParent', false);
    },
    onCheck({checkedKeys, info}) {
        console.log('onCheck', checkedKeys, info);
        this.data.set('checkedKeys', checkedKeys);
    }
}
</script>
```
</codebox>
