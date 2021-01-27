<text lang="cn">
#### 自定义标题
设置鼠标放在状态点上时显示的文字
</text>

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
import {Badge} from 'santd';

export default {
    components: {
        's-badge': Badge
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
