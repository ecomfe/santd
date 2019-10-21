<text lang="cn">
#### 自定义已选项
例如给最后一项加上邮编链接。
</text>

```html
<template>
    <div>
        <s-cascader
            options="{{options}}"
            on-change="onChange"
            defaultValue="{{defaultValue}}"
        >
            <template s-for="item, index in label" slot="displayRender">
                <span s-if="index === label.length - 1">
                    {{item}} (<a href="javascript:;" on-click="handleAreaClick($event, item, selectedOptions[index])">{{selectedOptions[index].code}}</a>)
                </span>
                <span s-else>{{item}} / </span>
            </template>
        </s-cascader>
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
            label: 'West Lake',
            code: 752100
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
            code: 453400
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
            defaultValue: ['zhejiang', 'hangzhou', 'xihu']
        };
    },
    onChange(value) {
      console.log(value)
    }
}
</script>
```
