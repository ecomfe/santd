<text lang="cn">
#### 可以自定义显示
切换按钮和结果分开。
</text>

```html
<template>
    <div>
        <span>
            {{selectText}}
            <s-cascader options="{{options}}" on-change="onChange">
                <a href="javascript:;">Change city</a>
            </s-cascader>
        </span>
    </div>
</template>
<script>
import Cascader from 'santd/cascader';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou'
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing'
    }]
}];

export default {
    components: {
        's-cascader': Cascader
    },
    initData() {
        return {
            selectText: 'Unselect',
            options: options
        };
    },
    onChange({value, selectedOptions}) {
        const selectText = selectedOptions.map(o => o.label).join(', ');
        this.data.set('selectText', selectText);
    }
}
</script>
```
