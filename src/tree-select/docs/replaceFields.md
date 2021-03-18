<codebox>
#### 替换字段
替换 treeNode 中 title、value、key、children、label 字段为 treeData 中对应的字段。

```html
<template>
  <div>
    <s-tree-select
        style="width: 100%;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeData="{{treeData}}"
        treeDefaultExpandAll="{{true}}"
        placeholder="Please select"
        on-change="onChange"
        replaceFields="{{replaceFields}}"
    >
    </s-tree-select>
  </div>
</template>
<script>
import {TreeSelect} from 'santd';

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
    children: [
        {
        title: 'Child3',
        value: '0-0-2',
        key: '0-0-2',
      },
      {
        title: 'Child4',
        value: '0-0-2',
        key: '0-0-2',
      }
    ]

  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}];


export default {
    components: {
        's-tree-select': TreeSelect
    },
    initData() {
        return {
            treeData: treeData,
            replaceFields: {
              children:'children',
              title:'title',
              key:'key',
              value: 'value',
              label: 'label'
            }
        }
    },
    onChange(value) {
        console.log('选择的单一值是: ', value);
    }
}
</script>
```
</codebox>
