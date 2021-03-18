<codebox>
#### 自定义样式
可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

```html
<template>
    <div id="custom">
        <s-back-top>
            <div class="santd-back-top-inner">UP</div>
        </s-back-top>
        Scroll down to see the bottom-right<strong style="color: #1088e9;"> blue </strong>button.
    </div>
</template>
<script>
import {BackTop} from 'santd';

export default {
    components: {
        's-back-top': BackTop
    }
}
</script>
<style type="text/css">
    #custom .santd-back-top {
      bottom: 100px;
    }
    #custom .santd-back-top-inner {
      height: 40px;
      width: 40px;
      line-height: 40px;
      border-radius: 4px;
      background-color: #1088e9;
      color: #fff;
      text-align: center;
      font-size: 20px;
    }
</style>
```
</codebox>
