<text lang="cn">
#### 基本
最简单的用法
</text>

```html
<template>
  <div>
    <s-breadcrumb routes="{{routes}}">
        <!--<s-brcrumbitem>Home</s-brcrumbitem>
        <s-brcrumbitem><a href="">Application Center</a></s-brcrumbitem>
        <s-brcrumbitem><a href="">Application List</a></s-brcrumbitem>
        <s-brcrumbitem>An Application</s-brcrumbitem>-->
    </s-breadcrumb>
  </div>
</template>
<script>
import Breadcrumb from 'santd/breadcrumb';

export default {
    initData() {
        return {
routes: [{
    path: 'index',
    breadcrumbName: 'home'
        }, {
        path: 'first',
        breadcrumbName: 'first'
        }]
        }
    },
    components: {
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.BrcrumbItem
    }
}
</script>
```
