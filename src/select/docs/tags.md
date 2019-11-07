<text lang="cn">
#### 标签
tags select，随意输入的内容（scroll the menu）
</text>

```html
<template>
    <div>
        <s-select
            mode="tags"
            style="width: 100%;"
            placeholder="Tags Mode"
            on-change="handleChange"
        >
            <s-select-option
                s-for="val in children"
                value="{{val}}"
            >{{val}}</s-select-option>
        </s-select>
    </div>
</template>

<script>
import Select from 'santd/select';

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
}

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            children
        };
    },
    handleChange(value) {
        console.log(`selected ${value}`);
    }
}
</script>
```
