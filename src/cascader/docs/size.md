<text lang="cn">
#### 大小
不同大小的级联选择器。
</text>

```html
<template>
    <div>
        <s-cascader size="large" options="{{options}}" on-change="onChange" placeholder="Please select" />
        <br>
        <s-cascader options="{{options}}" on-change="onChange" placeholder="Please select" />
        <br>
        <s-cascader size="small" options="{{options}}" on-change="onChange" placeholder="Please select" />
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
            options: options
        };
    },
    onChange(value) {
      console.log(value);
    }

}
</script>
```
