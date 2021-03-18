<codebox>
#### 异步加载
异步加载树节点。

```html
<template>
  <div>
    <s-tree-select
        style="width: 100%;"
        dropdownStyle="{{ {'max-height': '200px', overflow: 'auto'} }}"
        treeData="{{treeData}}"
        treeDefaultExpandAll="{{true}}"
        placeholder="Please select"
        loadData="{{loadData}}"
        on-change="onChange"
    >
    </s-tree-select>
  </div>
</template>
<script>
import {TreeSelect} from 'santd';

const treeData = [
    {value: '1', title: 'Expand to load', key: '0'},
    {value: '2', title: 'Expand to load', key: '1'},
    {value: '3', title: 'Tree Node', isLeaf: true, key: '2'}
];

const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random()
        .toString(36)
        .substring(2, 6);
    return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf
    };
};


export default {
    components: {
        's-tree-select': TreeSelect
    },
    initData() {
        return {
            treeData: treeData,
            loadData(treenode) {

        new Promise(resolve => {
            if (treenode.data.get('treeData')) {
                resolve();
                return;
            }
            setTimeout(() => {
                treenode.data.set('treeData', [{title: 'Child Node', key: Math.floor(Math.random() * 10) + 'node'}]);
                resolve();
            }, 1000)
        });
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
