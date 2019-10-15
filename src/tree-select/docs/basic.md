<text lang="cn">
#### tree-select基本
树选择组件,最简单的用法
</text>

```html
<template>
  <div>
    <s-tree-select
        showSearch="{{true}}"
        style="width: 300px;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeDefaultExpandAll="{{true}}"
        allowClear="{{true}}"
        value="{{['leaf-1']}}"
        placeholder="Please select"
        on-change="onChange"
        labelInValue="{{true}}"
    >
        <s-tree-select-node value="parent-1" title="parent 1" key="0-0">
            <s-tree-select-node value="parent-1-0" title="parent 1-0" key="0-0-0" disabled="{{true}}">
                <s-tree-select-node value="leaf-1" title="leaf0-1" key="0-0-0-0" disableCheckbox="{{true}}"/>
                <s-tree-select-node value="leaf-2" title="leaf0-2" key="0-0-0-1"/>
            </s-tree-select-node>
            <s-tree-select-node value="parent-1-1" title="parent 1-1" key="0-0-1">
                <s-tree-select-node value="leaf-3" title="leaf1-1" key="0-0-1-0"/>
                <s-tree-select-node value="leaf-4" title="leaf1-2" key="0-0-2-0"/>
            </s-tree-select-node>
            <s-tree-select-node value="parent-1-2" title="parent 1-2" key="0-0-2">
            </s-tree-select-node>
        </s-tree-select-node>
    </s-tree-select>
  </div>
</template>
<script>

import san from 'san'
import TreeSelect from 'santd/tree-select';
import Icon from 'santd/icon';

export default {
    components: {
        's-tree-select': TreeSelect,
        's-tree-select-node': TreeSelect.TreeSelectNode
    },
    onChange(value) {
        console.log('选择的单一值是: ', value);
    }
}
</script>
```
