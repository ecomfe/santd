<text lang="cn">
#### 异步数据加载
点击展开节点，动态加载数据。
</text>

```html
<template>
  <div>
    <s-tree
        treeNodeData="{{data}}"
        loadData="{{onLoadData}}"
    ></s-tree>
  </div>
</template>
<script>
import Tree from 'santd/tree';
import {deepCopy} from 'santd/core/util';

const getChildData = () => {
    return [{
        title: 'Child Node',
        key: 'child' + parseInt(Math.random()* 10000)
    },
    {
        title: 'Child Node',
        key: 'child' + parseInt(Math.random()* 10000)
    }];

}

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
            onLoadData: this.onLoadData.bind(this)
        }
    },
    onLoadData(treeNode) {
        return new Promise(resolve => {
            const key = treeNode.data.get('key');
            // 实际上最好是能动态的改变data，通过data的变化来更新
            // 通过第一层和treeNode,是能对应上key的，对应上以后，把返回的数据append到对应的数据上
            // 当在不断展开一层时，安装逻辑继续找对应，找到后再次添加到children中
            const treeNodeData = this.data.get('data');

            const tmpData = this.loopFilterData(treeNodeData, key);
            if (tmpData.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                this.setTreeNodeChildren(treeNodeData, key);
                console.log('treeNodeData', treeNodeData)
                this.data.set('data',deepCopy(treeNodeData));
                resolve();
            }, 1000);
        })
    },
    loopFilterData(data, key) {
        let filterData = [];
        function loopChildren(data) {
            data.forEach(item => {
                if (item.key === key) {
                    filterData.push(item);
                }
                if (item.children) {
                    loopChildren(item.children);
                }
            });
            return filterData;
        }
        return loopChildren(data);
    },
    setTreeNodeChildren(data, key) {
        function loopChildren(data) {
            data.forEach(item => {
                if (item.key === key) {
                    item.children = getChildData();
                }
                if (item.children) {
                    loopChildren(item.children);
                }
            });
        }
        return loopChildren(data);
    }
}
</script>
```
