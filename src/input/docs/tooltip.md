<text lang="cn">
#### 输入时格式化展示
结合 `tooltip`组件，实现一个数值输入框，方便内容超长时的全量展现。
</text>

```html
<template>
<div>
    <s-tooltip
        trigger="click"
        placement="topLeft"
        title="{{value || 'Input a number'}}"
    >
        <s-input
            placeholder="base useage"
            on-change="onChange"
            maxLength="20"
            style="width:120px"
        ></s-input>
    </s-tooltip>
</div>
</template>
<script>
import {Input, Tooltip} from 'santd';

export default {
    components: {
        's-input': Input,
        's-tooltip': Tooltip
    },
    onChange(value) {
        this.data.set('value', value);
    }
}
</script>

```
