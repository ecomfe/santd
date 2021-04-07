<text lang="cn">
#### 图标按钮

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。
如果想控制 `Icon` 具体的位置，只能直接使用 `Icon` 组件，而非 `icon` 属性。
</text>

```html
<template>
  <div>
    <s-button type="primary" shape="circle" icon="search" />
    <s-button type="primary" shape="circle">A</s-button>
    <s-button type="primary" icon="search">Search</s-button>
    <s-button shape="circle" icon="search" />
    <s-button icon="search">Search</s-button>
    <br />
    <s-button shape="circle" icon="search" />
    <s-button icon="search">Search</s-button>
    <s-button type="dashed" shape="circle" icon="search" />
    <s-button type="dashed" icon="search">Search</s-button>
  </div>
</template>
<script>
import {Button} from 'santd';

export default {
    components: {
        's-button': Button
    }
}
</script>
```
