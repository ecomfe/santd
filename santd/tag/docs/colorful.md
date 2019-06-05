<cn>
#### 多彩标签
我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。
</cn>

```html
<template>
    <div>
        <h4 style="margin-bottom: 16px">Presets:</h4>
        <div>
          <s-tag color="pink">pink</s-tag>
          <s-tag color="red">red</s-tag>
          <s-tag color="orange">orange</s-tag>
          <s-tag color="green">green</s-tag>
          <s-tag color="cyan">cyan</s-tag>
          <s-tag color="blue">blue</s-tag>
          <s-tag color="purple">purple</s-tag>
        </div>
        <br>
        <h4 style="margin: '16px 0'">Custom:</h4>
        <div>
          <s-tag color="#f50">#f50</s-tag>
          <s-tag color="#2db7f5">#2db7f5</s-tag>
          <s-tag color="#87d068">#87d068</s-tag>
          <s-tag color="#108ee9">#108ee9</s-tag>
        </div>
    </div>
</template>
<script>
import Tag from 'santd/tag';
export default {
    components: {
        's-tag': Tag
    }
}
</script>
```
