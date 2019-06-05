<cn>
#### 自定义提示
使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={{null}}`，则隐藏 Tooltip。
</cn>

```html
<template>
  <div>
  	<s-slider value="{{88}}" tipFormatter="__value__%"/>
    <s-slider range value="{{[10,20]}}" tipFormatter="{{novalue}}"/>
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
            novalue: null
        };
    }
}
</script>
```