<text lang="cn">
#### 使用iconfont.cn

对于使用 [iconfont.cn](http://www.iconfont.cn) 的用户，通过设置 `createFromIconfontCN` 方法参数对象中的 `scriptUrl` 字段， 即可轻松地使用已有项目中的图标。
</text>

```html
<template>
<div class="icons-list">
    <s-icon type="icon-tuichu"></s-icon>
    <s-icon type="icon-facebook"></s-icon>
    <s-icon type="icon-twitter"></s-icon>
</div>
</template>
<script>
import Icon from 'santd/icon';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
});
export default {
    components: {
        's-icon': IconFont
    }
}
</script>
```
