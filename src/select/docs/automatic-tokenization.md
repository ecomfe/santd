<text lang="cn">
#### 自动分词
试下复制 `露西,杰克` 到输入框里。只在 tags 和 multiple 模式下可用。
</text>

```html
<template>
    <div>
        <s-select
            mode="tags"
            style="width: 100%;"
            tokenSeparators="{{[',']}}"
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
import {Select} from 'santd';

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
