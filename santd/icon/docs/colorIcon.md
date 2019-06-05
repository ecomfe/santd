<cn>
#### 多色图标
通过设置`theme`的属性为 `twoTone` 来渲染双色图标，并且可以设置主题色。
</cn>

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
<style type="text/css">
  ul {
    list-style: none;
}
.markdown div ul li {
  display: inline-block;
  font-size:30px;
  margin: 10px;
  list-style-type: inherit;
}
</style>
```
