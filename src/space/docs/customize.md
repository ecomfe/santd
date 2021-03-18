<codebox>
#### 自定义间距大小
自定义间距大小。

```html
<template>
  <fragment>
    <s-silder value="{{size}}" on-change="handleChange"></s-silder>
    <br>
    <s-space size="{{size}}">
      <s-button type="primary">Primary</s-button>
      <s-button>Default</s-button>
      <s-button type="dashed">Dashed</s-button>
      <s-button type="link">Link</s-button>
    </s-space>
  </fragment>
</template>

<script>
import {Space, Slider, Button} from 'santd';

export default {
    components: {
        's-space': Space,
        's-silder': Slider,
        's-button': Button
    },
    initData() {
        return {
            size: 8
        }
    },
    handleChange(value) {
        console.log('silder change', value);
        this.data.set('size', value);
    }
}
</script>
```
</codebox>
