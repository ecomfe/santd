<cn>
#### 自定义
自定义图片、描述、附属内容。
</cn>

```html
<template>
  <div>
  	<s-empty
        image="https://gss0.bdstatic.com/5bd1bjqh_Q23odCf/static/newsdetail/img/del.png"
    >
        <span slot="description">
            Customize <a href="#API">Description</a>
        </span>
        <s-button type="primary" slot="footer">Create Now</s-button>
    </s-empty>
  </div>
</template>
<script>
import empty from 'santd/empty';
import button from 'santd/button';
export default {
    components: {
        's-empty': empty,
        's-button': button
    }
}
</script>
```