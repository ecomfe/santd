<text lang="cn">
#### 多色图标
通过设置`theme`的属性为 `twoTone` 来渲染双色图标，并且可以设置主题色。
</text>

```html
<template>
<div class="icons-list">
    <s-icon type="smile" theme="twoTone"></s-icon>
    <s-icon type="heart" theme="twoTone" twoToneColor="#eb2f96"></s-icon>
    <s-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"></s-icon>
</div>
</template>
<script>
import Icon from 'santd/icon';
export default {
    components: {
        's-icon': Icon
    }
}
</script>
```
