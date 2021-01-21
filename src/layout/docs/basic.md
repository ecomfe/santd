<text lang="cn">
#### 基本结构
典型的页面布局。
</text>

```html
<template>
  <div id="components-layout-demo-basic">
    <s-layout>
      <s-header>Header</s-header>
      <s-content>Content</s-content>
      <s-footer>Footer</s-footer>
    </s-layout>

    <s-layout>
      <s-header>Header</s-header>
      <s-layout>
        <s-sider>Sider</s-sider>
        <s-content>Content</s-content>
      </s-layout>
      <s-footer>Footer</s-footer>
    </s-layout>

    <s-layout>
      <s-header>Header</s-header>
      <s-layout>
        <s-content>Content</s-content>
        <s-sider>Sider</s-sider>
      </s-layout>
      <s-footer>Footer</s-footer>
    </s-layout>

    <s-layout>
      <s-sider>Sider</s-sider>
      <s-layout>
        <s-header>Header</s-header>
        <s-content>Content</s-content>
        <s-footer>Footer</s-footer>
      </s-layout>
    </s-layout>
  </div>
</template>

<script>
import {Layout} from 'santd';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-footer': Layout.Footer,
        's-sider': Layout.Sider
    }
}
</script>
```
