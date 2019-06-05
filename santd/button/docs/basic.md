<cn>
#### 基本按钮类型
按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。
</cn>

```html
<template>
  <div>
    <s-button type="primary">Primary</s-button>
    <s-button>Default</s-button>
    <s-button type="danger">Danger</s-button>
    <s-button type="dashed">Dashed</s-button>
  </div>
</template>
<script>
import Button from 'santd/button';
export default {
    components: {
        's-button': Button
    }
}
</script>
```
