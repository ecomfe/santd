<codebox>
#### 分隔符
使用 `separator=">"` 可以自定义分隔符

```html
<template>
  <div>
    <s-breadcrumb separator=">">
        <s-brcrumbitem>Home</s-brcrumbitem>
        <s-brcrumbitem><a href="">Application Center</a></s-brcrumbitem>
        <s-brcrumbitem><a href="">Application List</a></s-brcrumbitem>
        <s-brcrumbitem>An Application</s-brcrumbitem>
    </s-breadcrumb>
  </div>
</template>
<script>
import {Breadcrumb} from 'santd';

export default {
    components: {
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.Item
    }
}
</script>
```
</codebox>
