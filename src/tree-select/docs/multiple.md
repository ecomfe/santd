<text lang="cn">
#### 多选
多选的树选择。
</text>

```html
<template>
  <div>
    <s-tree-select
        showSearch
        style="width: 300px;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeDefaultExpandAll
        allowClear
        multiple
        placeholder="Please select"
        on-change="onChange"
        on-search="onSearch"
    >
        <s-tree-select-node value="parent-1" title="parent 1" key="0-0">
            <s-tree-select-node value="parent1-0" title="parent 1-0" key="0-0-0">
                <s-tree-select-node value="leaf1" title="leaf0-1" key="0-0-0-0"/>
                <s-tree-select-node value="leaf2" title="leaf0-2" key="0-0-0-1"/>
            </s-tree-select-node>
            <s-tree-select-node value="parent1-1" title="parent 1-1" key="0-0-1">
                <s-tree-select-node value="leaf3" title="leaf1-1" key="0-0-1-0"/>
                <s-tree-select-node value="leaf4" title="leaf1-2" key="0-0-2-0"/>
            </s-tree-select-node>
            <s-tree-select-node value="parent1-2" title="parent 1-2" key="0-0-2">
            </s-tree-select-node>
        </s-tree-select-node>
    </s-tree-select>
  </div>
</template>
<script>

import TreeSelect from 'santd/tree-select';

export default {
    components: {
        's-tree-select': TreeSelect,
        's-tree-select-node': TreeSelect.TreeSelectNode
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
