<text lang="cn">
#### 带有图标的
图标放在文字前面
</text>

```html
<template>
  <div>
    <s-breadcrumb>
        <s-brcrumbitem>
            <s-icon type="home"></s-icon>
        </s-brcrumbitem>
        <s-brcrumbitem href="#">
            <s-icon type="user"></s-icon>
            <span>Application List</span>
        </s-brcrumbitem>
        <s-brcrumbitem>Application</s-brcrumbitem>
    </s-breadcrumb>
  </div>
</template>
<script>
import Icon from 'santd/icon';
import Breadcrumb from 'santd/breadcrumb';

export default {
    components: {
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.Item,
        's-icon': Icon
    }
}
</script>
```