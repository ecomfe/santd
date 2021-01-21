<text lang="cn">
#### 独立使用
不包裹任何元素即是独立使用，可自定样式展现。
</text>

```html
<template>
    <div>
        <s-badge count="{{25}}"/>
        <s-badge count="{{4}}" style="{{{'background-color': '#fff', 'color': '#999', 'box-shadow': '0 0 0 1px #d9d9d9 inset'}}}"/>
        <s-badge count="{{109}}" style="{{{'background-color': '#52c41a'}}}"/>
    </div>
</template>
<script>
import {Badge} from 'santd';

export default {
    components: {
        's-badge': Badge
    }
}
</script>
```
