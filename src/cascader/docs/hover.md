<text lang="cn">
#### 移入展开
通过移入展开下级菜单，点击完成选择。
</text>

```html
<template>
    <div>
        <s-cascader
            options="{{options}}"
            on-change="onChange"
            placeholder="Please select"
            expandTrigger="hover"
            displayRender="{{displayRender}}"
        />
    </div>
</template>
<script>
import Cascader from 'santd/cascader';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake'
        }]
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }]
    }]
}];

export default {
    components: {
        's-cascader': Cascader
    },
    initData() {
        return {
            options: options,
            displayRender(label) {
                return label[label.length - 1];
            }
        };
    },
    onChange(value) {
      console.log(value)
    }

}
</script>
```
