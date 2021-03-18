<codebox>
#### tree-select基本
树选择组件,最简单的用法

```html
<template>
  <div>
    <s-tree-select
        style="width: 100%;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeDefaultExpandAll="{{true}}"
        allowClear="{{true}}"
        placeholder="Please select"
        on-change="onChange"
    >
        <s-tree-select-node value="parent 1" title="parent 1" key="0-1">
            <s-tree-select-node value="parent 1-0" title="parent 1-0" key="0-1-1">
                <s-tree-select-node value="leaf1" title="my leaf" key="random" />
                <s-tree-select-node value="leaf2" title="your leaf" key="random1" />
            </s-tree-select-node>
            <s-tree-select-node value="parent 1-1" title="parent 1-1" key="random2">
                <s-tree-select-node value="sss" key="random3">
                    <b style="color: #08c;" slot="title">sss</b>
                </s-tree-select-node>
            </s-tree-select-node>
        </s-tree-select-node>
    </s-tree-select>
  </div>
</template>
<script>

import san from 'san'
import {TreeSelect} from 'santd';

export default {
    components: {
        's-tree-select': TreeSelect,
        's-tree-select-node': TreeSelect.TreeNode
    },
    onChange(value) {
        console.log('选择的单一值是: ', value);
    }
}
</script>
```
</codebox>
