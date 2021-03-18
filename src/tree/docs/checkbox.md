<codebox>
#### 受控操作示例
tree受控操作示例

```html
<template>
  <div>
    <s-tree
        data="{{data}}"
        checkable="{{true}}"
        defaultExpandedKeys="{{defexpandedKeys}}"
        defaultCheckedKeys="{{checkedKeys}}"
        on-select="onSelect"
        on-check="onCheck"
        on-expand="onExpand"
        expandedKeys="{{expandedKeys}}"
        multiple
    ></s-tree>
  </div>
</template>
<script>
import {Tree} from 'santd';

export default {
    components: {
        's-tree': Tree,
        's-tree-item': Tree.TreeItem
    },
    initData() {
        return {
            data: '',
            expandedKeys: []
        }
    },
    created() {
        let newData = [
                {
                    title: 'parent 1',
                    key: 'lavel01',
                    children: [
                        {
                            title: 'parent 1-1',
                            key: 'lavel01-1',
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    key: 'lavel01-1-1'
                                },
                                {
                                    title: 'parent 1-1-2',
                                    key: 'lavel01-1-2',
                                    children: [
                                        {
                                            title: 'leaf 1-1-2-0',
                                            key: 'lavel01-1-2-0-1',
                                            disabled: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            key: 'lavel01-2',
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    key: 'lavel01-2-1'
                                },
                                {
                                    title: 'leaf 1-2-2',
                                    key: 'lavel01-2-2'
                                }
                            ]
                        }
                    ]
                }
            ];
        let defaultExpandedKeys = ['lavel01-1-2', 'lavel01-2'];
        setTimeout(() => {
            this.data.set('defexpandedKeys', defaultExpandedKeys);
            this.data.set('expandedKeys', ['lavel01-1', 'lavel01-2']);
            this.data.set('checkedKeys',['lavel01-1']);
            this.data.set('data', newData);
        }, 300);
    },
    onSelect(key) {
        console.log('selectKey: ', key);
    },
    onCheck(key) {
        console.log('checked: ', key);
    },
    onExpand(key) {
        console.log('expandKey: ', key);
    }
}
</script>
```
</codebox>
