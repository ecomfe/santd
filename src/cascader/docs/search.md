<codebox>
#### 搜索
可以直接搜索选项并选择。

```html
<template>
    <div>
        <s-cascader options="{{options}}" on-change="onChange" placeholder="Please select" showSearch="{{filter}}"/>
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
            options: options,
            filter(inputValue, path) {
                return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
            }
        };
    },
    onChange(value) {
      console.log(value)
    }

}
</script>
```
</codebox>
