<text lang="cn">
#### 按钮类型
按钮有五种类型：主按钮、次按钮、虚线按钮、危险按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
</text>

```html
<template>
  <div>
    <s-button type="primary">Primary</s-button>
    <s-button>Default</s-button>
    <s-button type="danger">Danger</s-button>
    <s-button type="dashed">Dashed</s-button>
    <s-button type="link">Link</s-button>
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
