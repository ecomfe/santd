<text lang="cn">
#### 基本用法
使用 `<Icon />` 标签声明组件，指定图标对应的 `type` 属性。可以通过 `theme` 属性来设置不同的主题风格的图标，也可以通过设置 `spin` 属性来实现动画旋转效果。
</text>

```html
<template>
<div class="icons-list">
    <s-icon type="home"></s-icon>
    <s-icon type="setting" theme="filled"></s-icon>
    <s-icon type="smile" theme="outlined"></s-icon>
    <s-icon type="sync" spin></s-icon>
    <s-icon type="smile" rotate="{{180}}"></s-icon>
    <s-icon type="loading"></s-icon>
</div>
</template>
<script>
import {Icon} from 'santd';

export default {
    components: {
        's-icon': Icon
    }
}
</script>
```
