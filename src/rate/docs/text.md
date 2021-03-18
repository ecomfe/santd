
<codebox>
#### 文案展现
给评分组件加上文案展示。

```html
<template>
    <div class="san-rate">
        <s-rate value="{{value}}" on-change="handleChange" tooltips="{{desc}}"></s-rate>
        <span s-if="value" class="san-rate-text">{{desc[value - 1]}}</span>
    </div>
</template>
<script>
import {Rate} from 'santd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default {
    components: {
        's-rate': Rate
    },
    initData() {
        return {
            desc: desc,
            value: 3
        }
    },
    handleChange(value) {
        this.data.set('value', value);
    }
}
</script>
```
</codebox>
