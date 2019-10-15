<text lang="cn">
#### 获得选项的文本
默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。
选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。
</text>

```html
<template>
    <div>
        <s-select labelInValue="{{true}}" defaultValue="{{ { key: 'lucy' } }}" style="width: 120px;" on-change="onChange">
            <s-select-option value="jake">Jake(001)</s-select-option>
            <s-select-option value="lucy">Lucy(002)</s-select-option>
            <s-select-option value="jason">Jason</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
        }
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
