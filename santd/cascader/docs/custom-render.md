<cn>
#### 自定义已选项
例如给最后一项加上邮编链接。
</cn>

```html
<template>
    <div>
        <s-cascader
            options="{{options}}"
            on-change="onChange"
            defaultValue="{{defaultValue}}"
            displayRender="{{displayRender}}"
        />
    </div>
</template>
<script>
import san from 'san';
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
            defaultValue: ['zhejiang', 'hangzhou', 'xihu'],
            displayRender(label, selectedOptions) {
                return san.defineComponent({
                    initData() {
                        return {
                            label: label,
                            selectedOptions: selectedOptions
                        };
                    },
                    handleAreaClick(e, item, option) {
                        e.stopPropagation();
                        console.log('clicked', label, option);
                    },
                    template: `<span>
                        <template s-for="item, index in label">
                            <span s-if="index === label.length - 1">
                                {{item}} (<a href="javascript:;" on-click="handleAreaClick($event, item, selectedOptions[index])">{{selectedOptions[index].code}}</a>)
                            </span>
                            <span s-else>{{item}} / </span>
                        </template>
                    </span>`
                });
            }
        };
    },
    onChange(value) {
      console.log(value)
    }
}
</script>
```
