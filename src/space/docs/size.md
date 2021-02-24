<text lang="cn">
#### 间距大小

间距预设大、中、小三种大小。

通过设置 `size` 为 `large`、`middle` 分别把间距设为大、中间距。若不设置 `size`，则间距为小。
</text>

```html
<template>
  <fragment>
    <s-radio-group name="radiogroup" value={{size}} on-change="handleChange">
      <s-radio value="small">Small</s-radio>
      <s-radio value="middle">Middle</s-radio>
      <s-radio value="large">Large</s-radio>
    </s-radio-group>
    <br>
    <br>
    <s-space size={{size}}>
      <s-button type="primary">Primary</s-button>
      <s-button>Default</s-button>
      <s-button type="dashed">Dashed</s-button>
      <s-button type="link">Link</s-button>
    </s-space>
  </fragment>
</template>

<script>
import {Space, Radio, Button} from 'santd';

export default {
    components: {
        's-space': Space,
        's-radio': Radio,
        's-radio-group': Radio.Group,
        's-button': Button
    },
    initData() {
        return {
            size: 'small'
        }
    },
    handleChange(e) {
        console.log('radio checked', e.target.value);
        this.data.set('size', e.target.value);
    }
}
</script>
```
