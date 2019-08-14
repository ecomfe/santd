<text lang="cn">
#### 带移除图标
带移除图标的输入框，点击图标删除所有内容
</text>

```html
<template>
  <div>
    <s-input value="{{value}}" placeholder="input with clear icon" allowClear on-change="onChange"/>
  </div>
</template>
<script>
import Input from 'santd/input';
import Icon from 'santd/icon';
export default {
    components: {
        's-input': Input
    },
    onChange(value) {
        console.log('the value is: ', value);
    },
    created() {
        setTimeout(() => {
            this.data.set('value', 1234)
        },1000)
    }
}
</script>
```
