<cn>
#### 自定义样式
可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。
</cn>

```html
<template>
    <div id="custom">
        <s-back-top>
            <div className="san-back-top-inner">UP</div>
        </s-back-top>
        Scroll down to see the bottom-right<strong style="color: #1088e9;"> blue </strong>button.
    </div>
</template>
<script>
import backtop from 'santd/back-top';
export default {
    components: {
        's-back-top': backtop
    }
}
</script>
<style type="text/css">
    #custom .san-back-top {
      bottom: 100px;
    }
    #custom .san-back-top-inner {
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
