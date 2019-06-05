<cn>
#### 基本
基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。
</cn>

```html
<template>
  <div>
  	<s-slider value="{{88}}" disabled="{{disabled}}"/>
    <s-slider range value="{{[10,30]}}" disabled="{{disabled}}" step="{{5}}"/>
    Disabled <s-switch on-change='onChange'/>
  </div>
</template>
<script>
import slider from 'santd/slider';
import Switch from 'santd/switch';
export default {
    components: {
        's-slider': slider,
        's-switch': Switch
    },
    initData() {
    },
    onChange(checked)  {
        this.data.set('disabled', checked);
    }
}
</script>
```
