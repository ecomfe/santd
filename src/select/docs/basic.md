<text lang="cn">
#### 基本用法
基本使用
</text>

```html
<template>
    <div>
        <s-select defaultValue="lucy" style="width: 120px;" on-change="handleChange">
            <s-select-option value="jack">Jack</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="disabled" disabled="{{true}}">Disabled</s-select-option>
            <s-select-option value="frank">Frank</s-select-option>
        </s-select>
        <s-select defaultValue="lucy" style="width: 120px;" disabled="{{true}}">
            <s-select-option value="lucy">Lucy</s-select-option>
        </s-select>
        <s-select defaultValue="lucy" style="width: 120px;" loading="{{true}}">
            <s-select-option value="lucy">Lucy</s-select-option>
        </s-select>
    </div>
</template>

<script>
import {Select} from 'santd';

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    handleChange(value) {
        console.log(`selected ${value}`);
    },
    test(e) {
        console.log({e})
    }
}
</script>

<style>
.code-box-demo .santd-select {
    margin: 0 8px 10px 0;
}
</style>
```
