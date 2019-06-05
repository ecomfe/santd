<cn>
#### 带标签的滑块
使用 `marks` 属性标注分段式滑块，使用 `value` / `defaultValue` 指定滑块位置。当 `included=false`时，表明不同标记间为并列关系。当 `step=null` 时，Slider 的可选值仅有 `marks` 标出来的部分。
</cn>

```html
<template>
  <div>
  	<s-slider value="88" marks="{{marks}}"/>
    <s-slider range value="{{[10,30]}}" marks="{{marks}}" step="{{novalue}}"/>
  </div>
</template>
<script>
import slider from 'santd/slider';
export default {
    components: {
        's-slider': slider
    },
    initData() {
        return {
            novalue: null,
            marks: {
                0: '0°C',
                26: '26°C',
                37: '37°C',
                100: {
                    style: 'color: #f50',
                    label: '100°C'
                }
            }
        };
    }
}
</script>
```