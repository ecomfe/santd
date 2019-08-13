<text lang="cn">
#### 自定义图标
可以针对不同的节点定制图标。
</text>

```html
<template>
  <div>
    <s-tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys="{{['0-0-0']}}"
        switcherIcon="{{switcher}}"
    >
        <s-tree-node title="parent 1" key="0-0" icon="{{titleIcon}}">
            <s-tree-node title="parent 1-0" key="0-0-0" icon="{{titleIcon}}"/>
            <s-tree-node title="parent 1-1" key="0-0-1" icon="{{sadIcon}}" />
        </s-tree-node>
    </s-tree>
  </div>
</template>
<script>
import san from 'san';
import Tree from 'santd/tree';
import Icon from 'santd/icon';

const switcherIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `
        <span>
            <s-icon type="down"></s-icon>
        </span>
    `
});

const titleIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `
        <span>
            <s-icon type="smile-o"></s-icon>
        </span>
    `
});

const sadIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `
        <span>
            <s-icon type="frown-o"></s-icon>
        </span>
    `
});

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode
    },
    initData() {
        return {
            switcher: switcherIcon,
            titleIcon: titleIcon,
            sadIcon: sadIcon
        }
    }
}
</script>
```
