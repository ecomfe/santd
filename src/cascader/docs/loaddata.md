<text lang="cn">
#### 动态加载选项
使用 `loadData` 实现动态加载选项。
> 注意：`loadData` 与 `showSearch` 无法一起使用。

</text>

```html
<template>
    <div>
        <s-cascader options="{{options}}" on-change="onChange" changeOnSelect loadData="{{loadData}}"/>
    </div>
</template>
<script>
import Cascader from 'santd/cascader';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false
}];

export default {
    components: {
        's-cascader': Cascader
    },
    initData() {
        return {
            options: options,
            loadData(selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true;

                // load options lazily
                setTimeout(() => {
                    targetOption.loading = false;
                    targetOption.children = [{
                        label: `${targetOption.label} Dynamic 1`,
                        value: 'dynamic1',
                    }, {
                        label: `${targetOption.label} Dynamic 2`,
                        value: 'dynamic2',
                    }];
                    this.data.set('options', [...this.data.get('options')])
                }, 1000);
            }
        };
    },
    onChange(value) {
        console.log(value)
    }

}
</script>
```
