<codebox>
#### 定制回填内容
使用 `optionLabelProp` 指定回填到选择框的 `Option` 属性。

```html
<template>
    <div>
        <s-select
            mode="multiple"
            style="width: 100%;"
            placeholder="select one country"
            defaultValue="{{['china']}}"
            optionLabelProp="label"
            on-change="handleChange"
        >
            <s-select-option value="china" label="China">
                <span role="img" aria-label="China">🇨🇳</span>China (中国)
            </s-select-option>
            <s-select-option value="usa" label="USA">
                <span role="img" aria-label="USA">🇺🇸</span>USA (美国)
            </s-select-option>
            <s-select-option value="japan" label="Japan">
                <span role="img" aria-label="Japan">🇯🇵</span>Japan (日本)
            </s-select-option>
            <s-select-option value="korea" label="Korea">
                <span role="img" aria-label="Korea">🇰🇷</span>Korea (韩国)
            </s-select-option>
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
    handleChange(value) {
        console.log(`selected ${value}`);
    }
}
</script>

<style>
.code-box-demo .santd-select span[role="img"] {
    margin-right: 6px;
}
</style>
```
</codebox>
