<cn>
#### 树穿梭框
使用 Tree 组件作为自定义渲染列表。
</cn>

```html
<template>
    <div>
        <s-transfer
            disabled="{{disabled}}"
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            renderList="{{renderList}}"
            showSelectAll="{{false}}"
            render="{{render}}"
            on-change="handleChange"
        />
    </div>
</template>
<script>

const treeData = [{
    key: '0-0', title: '0-0'
}, {
    key: '0-1',
    title: '0-1',
    children: [{
        key: '0-1-0', title: '0-1-0'
    }, {
        key: '0-1-1', title: '0-1-1'
    }]
}, {
    key: '0-2', title: '0-3'
}];

const transferDataSource = [];
function flatten(list = []) {
    list.forEach(item => {
        transferDataSource.push(item);
        flatten(item.children);
    });
}
flatten(treeData);

import san from 'san';
import transfer from 'santd/transfer';
import Tree from 'santd/tree';

const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};

export default {
    initData() {
        return {
            disabled: false,
            showSearch: false,
            mockData: transferDataSource,
            targetKeys: [],
            render(item) {
                return item.title;
            },
            renderList({direction}) {
                if (direction !== 'left') {
                    return null;
                }
                return san.defineComponent({
                    components: {
                        's-tree': Tree,
                        's-treenode': Tree.TreeNode
                    },
                    inited() {
                        this.data.set('instance', this);
                    },
                    computed: {
                        checkedKeys() {
                            const instance = this.data.get('instance');
                            const selectedKeys = this.data.get('selectedKeys');
                            const targetKeys = this.data.get('targetKeys');
                            return [...selectedKeys, ...targetKeys];
                        }
                    },
                    handleCheck({e}) {
                        const selectedKey = e.node.data.get('key');
                        const checkedKeys = this.data.get('checkedKeys');
                        this.fire('itemSelect', {selectedKey, checked: !isChecked(checkedKeys, selectedKey)});
                    },
                    handleSelect({e}) {
                        const selectedKey = e.node.data.get('key');
                        const checkedKeys = this.data.get('checkedKeys');
                        this.fire('itemSelect', {selectedKey, checked: !isChecked(checkedKeys, selectedKey)});
                    },
                    isDisabled(checkedKeys, key) {
                        return checkedKeys.includes(key);
                    },
                    template: `<div>
                        <s-tree
                            blockNode
                            checkable
                            checkStrictly
                            defaultExpandAll
                            checkedKeys="{{checkedKeys}}"
                            on-check="handleCheck"
                            on-select="handleSelect"
                        >
                            <s-treenode key="0-0" title="0-0" disabled="{{isDisabled(targetKeys, '0-0')}}"></s-treenode>
                            <s-treenode key="0-1" title="0-1" disabled="{{isDisabled(targetKeys, '0-1')}}">
                                <s-treenode key="0-1-0" title="0-1-0" disabled="{{isDisabled(targetKeys, '0-1-0')}}"></s-treenode>
                                <s-treenode key="0-1-1" title="0-1-1" disabled="{{isDisabled(targetKeys, '0-1-1')}}"></s-treenode>
                            </s-treenode>
                            <s-treenode key="0-2" title="0-3" disabled="{{isDisabled(targetKeys, '0-2')}}"></s-treenode>
                        </s-tree>
                    </div>`
                });
            }
        };
    },
    components: {
        's-transfer': transfer
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
    }
}
</script>
```
