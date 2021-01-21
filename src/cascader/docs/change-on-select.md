<text lang="cn">
#### 选择即改变
这种交互允许只选中父级选项。
</text>

```html
<template>
    <div>
        <s-cascader options="{{options}}" on-change="onChange" placeholder="Please select" changeOnSelect />
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
      console.log(value)
    }

}
</script>
```
