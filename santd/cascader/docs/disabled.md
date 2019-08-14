<text lang="cn">
#### 禁用选项
通过指定 options 里的 `disabled` 字段。
</text>

```html
<template>
    <div>
        <s-cascader options="{{options}}" on-change="onChange" placeholder="Please select" />
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
    disabled: true,
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
            options: options
        };
    },
    onChange(value) {
      console.log(value)
    }

}
</script>
```
