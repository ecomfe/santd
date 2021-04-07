<text lang="cn">
#### 多选
多选的树选择。
</text>

```html
<template>
  <div>
    <s-tree-select
        style="width: 100%;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeDefaultExpandAll="{{true}}"
        allowClear="{{true}}"
        multiple="{{true}}"
        placeholder="Please select"
        on-change="onChange"
        on-search="onSearch"
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

import {TreeSelect} from 'santd';

export default {
    components: {
        's-tree-select': TreeSelect,
        's-tree-select-node': TreeSelect.TreeNode
    },
    onChange(value) {
        console.log('选择的单一值是: ', value);
    },
    onSearch(search) {
        console.log('search is.....', search);
    }
}
</script>
```
