<codebox>
#### 自动换行
自动换行。

```html
<template>
  <s-space size="{{[8, 16]}}" wrap={{true}}>
      <s-button s-for="_ in buttonNum">Button</s-button>
  </s-space>
</template>

<script>
import {Space, Button} from 'santd';

export default {
    components: {
        's-space': Space,
        's-button': Button
    },
    initData() {
        return {
            buttonNum: new Array(20)
        }
    }
}
</script>
```
</codebox>
