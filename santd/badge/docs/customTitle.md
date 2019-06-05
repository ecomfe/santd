<cn>
#### 自定义标题
设置鼠标放在状态点上时显示的文字
</cn>

```html
<style>
.san-badge:not(.san-badge-not-a-wrapper) {
    margin-right: 40px;
}
</style>
<template>
    <div>
        <s-badge
            title="Custom hover text"
            count="{{5}}">
            <a href="#" class="head-example"></a>
        </s-badge>
    </div>
</template>
<script>
import badge from 'santd/badge';
import icon from 'santd/icon';
export default {
    components: {
        's-badge': badge,
        's-icon': icon
    },
    initData() {
        return {
            style: {
                backgroundColor: '#0f0'
            }
        };
    }
}
</script>
```
