<cn>
#### 事件
当 Slider 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。
</cn>

```html
<template>
  <div>
  	<s-slider value="{{sliderValue}}" on-change="onChange"/>
    <s-input-number min="0" max="100" value="{{sliderValue}}" on-change="onIptChange"></s-input-number>
    <s-slider range value="{{[10,20]}}" on-afterChange="onAfterChange"/>
  </div>
</template>
<script>
import slider from 'santd/slider';
import InputNumber from 'santd/input-number';
export default {
    components: {
        's-input-number': InputNumber,
        's-slider': slider
    },
    initData() {
        return {
            sliderValue: 88
        }
    },
    onIptChange(value) {
        this.data.set('sliderValue', value);
    },
    onChange(value) {
        console.log('onchange', value);
        this.data.set('sliderValue', value);
    },
    onAfterChange(value) {
        console.log('onAfterChange', value);
    },
}
</script>
```
