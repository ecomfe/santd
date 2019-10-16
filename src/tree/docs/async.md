<text lang="cn">
#### 异步数据加载
点击展开节点，动态加载数据。
</text>

```html
<template>
  <div>
    <s-tree
        treeData="{{data}}"
        loadData="{{onLoadData}}"
    ></s-tree>
  </div>
</template>
<script>
import Tree from 'santd/tree';

export default {
    components: {
        's-tree': Tree,
        's-tree-item': Tree.TreeItem
    },
    initData() {
        return {
            data: [
                {
                    title: 'Expand to load',
                    key: '0'
                },
                {
                    title: 'Expand to load',
                    key: '1'
                },
                {
                    title: 'Tree Node',
                    key: '3',
                    isLeaf: true
                }
            ],
            onLoadData(treenode) {
                new Promise(resolve => {
                    if (treenode.data.get('treeData')) {
                        resolve();
                        return;
                    }
                    setTimeout(() => {
                        treenode.data.set('treeData', [{title: 'Child Node', key: Math.random() + '-0'}]);
                        resolve();
                    }, 1000)
                });
            }
        }
    }
}
</script>
```
