<cn>
#### 输入时格式化展示
结合 `tooltip`组件，实现一个数值输入框，方便内容超长时的全量展现。
</cn>

```html
<template>
<div>
    <s-tooltip
        trigger="click"
        placement="topLeft"
        getTooltipContainer="{{getTooltipContainer()}}"
    >
        <template slot="title">
            <span s-if="{{value}}">{{value}}</span>
            <span s-else>Input a number</span>
        </template>
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
import Input from 'santd/input';
import Tooltip from 'santd/tooltip';
export default {
    components: {
        's-input': Input,
        's-tooltip': Tooltip
    },
    onChange(value) {
        this.data.set('value', value);
    },
    getTooltipContainer() {
        return trigger => {
            return trigger.parentElement
        }
    }
}
</script>

```