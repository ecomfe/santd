<text lang="cn">
#### 虚拟滚动

使用 `height` 属性则切换为虚拟滚动。

只支持传入 treeData，不支持手动构造 TreeNode 节点。
</text>

```html
<template>
    <s-tree treeData="{{treeData}}" height="{{233}}" defaultExpandAll="{{true}}"></s-tree>
</template>
<script>
import {Tree} from 'santd';

function dig(path = '0', level = 3) {
    const list = [];
    for (let i = 0; i < 10; i += 1) {
        const key = `${path}-${i}`;
        const treeNode = {
            title: key,
            key,
        };

        if (level > 0) {
            treeNode.children = dig(key, level - 1);
        }

        list.push(treeNode);
    }
    return list;
}

const treeData = dig();

export default {
    components: {
        's-tree': Tree
    },
    initData() {
        return {
            treeData
        }
    }
}
</script>
```
