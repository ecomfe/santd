<text lang="cn">
#### 基本用法
基本使用
</text>

```html
<template>
    <div>
        <s-select
            defaultValue="lucy"
            style="width:120px;"
            on-change="onChange"
        >
            <s-select-option value="jake">Jake</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="tom" disabled>Tom</s-select-option>
            <s-select-option value="jason">Jason</s-select-option>
        </s-select>
        <s-select defaultValue="lucy" style="width: 120px; display:inline-block;" on-change="onChange" disabled>
            <s-select-option value="lucy">Lucy</s-select-option>
        </s-select>
        <s-select defaultValue="lucy" style="width: 120px; display:inline-block;" loading>
            <s-select-option value="lucy">Lucy</s-select-option>
        </s-select>
    </div>
</template>
<script>
import san from 'san';
import Select from 'santd/select';
import Icon from 'santd/icon';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-icon': Icon
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
