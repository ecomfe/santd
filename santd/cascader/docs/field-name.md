<cn>
#### 自定义字段名
自定义字段名
</cn>

```html
<template>
    <div>
        <s-cascader
            options="{{options}}"
            on-change="onChange"
            placeholder="Please select"
            fieldNames="{{fieldNames}}"
        />
    </div>
</template>
<script>
import Cascader from 'santd/cascader';

const options = [{
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [{
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [{
            code: 'xihu',
            name: 'West Lake'
        }]
    }]
}, {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [{
        code: 'nanjing',
        name: 'Nanjing',
        items: [{
            code: 'zhonghuamen',
            name: 'Zhong Hua Men'
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
            fieldNames: {
                label: 'name',
                value: 'code',
                children: 'items'
            }
        };
    },
    onChange(value) {
      console.log(value)
    }

}
</script>
```
