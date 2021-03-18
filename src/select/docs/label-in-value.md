<codebox>
#### 获得选项的文本
默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。
选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。

```html
<template>
    <div>
        <s-select
            labelInValue="{{true}}"
            defaultValue="{{{key: 'lucy'}}}"
            style="width: 120px;"
            on-change="handleChange"
        >
            <s-select-option value="jack">Jack (100)</s-select-option>
            <s-select-option value="lucy">Lucy (101)</s-select-option>
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
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
    }
}
</script>
```
</codebox>
