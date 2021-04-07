<text lang="cn">
#### 默认值
默认值通过数组的方式指定。
</text>

```html
<template>
  <div>
    <s-cascader
        defaultValue="{{defaultValue}}"
        options="{{options}}"
        on-change="onChange"
        placeholder="Please select"
    />
  </div>
</template>
<script>
import {Cascader} from 'santd';

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
            defaultValue: ['zhejiang','hangzhou', 'xihu'],
        };
    },
    onChange(value) {
      console.log(value)
    }
}
</script>
```
