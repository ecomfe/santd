<codebox>
#### 对齐
设置对齐模式。

```html
<template>
  <div class="space-align-container">
    <div class="space-align-block">
      <s-space align="center">
        <div>center</div>
        <s-button type="primary">Primary</s-button>
        <span class="mock-block">Block</span>
      </s-space>
    </div>
    <div class="space-align-block">
      <s-space align="start">
        <div>start</div>
        <s-button type="primary">Primary</s-button>
        <span class="mock-block">Block</span>
      </s-space>
    </div>
    <div class="space-align-block">
      <s-space align="end">
        <div>end</div>
        <s-button type="primary">Primary</s-button>
        <span class="mock-block">Block</span>
      </s-space>
    </div>
    <div class="space-align-block">
      <s-space align="baseline">
        <div>baseline</div>
        <s-button type="primary">Primary</s-button>
        <span class="mock-block">Block</span>
      </s-space>
    </div>
  </div>
</template>

<script>
import {Space, Button} from 'santd';

export default {
    components: {
        's-space': Space,
        's-button': Button
    }
}
</script>

<style>
.space-align-container {
  display: flex;
  flex-wrap: wrap;
}
.space-align-block {
  flex: none;
  margin: 8px 4px;
  padding: 4px;
  border: 1px solid #40a9ff;
}
.space-align-block .mock-block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, .2);
}
</style>  
```
</codebox>
