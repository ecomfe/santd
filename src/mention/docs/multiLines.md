<text lang="cn">
#### 多行
多行模式，多行模式必须指定高度。
</text>

```html
<template>
  <div>
    <s-mention
        style="width: 100%; height: 100px;"
        baseStyle="{{{width: '100%', height: '100px'}}}"
        multiLines="{{true}}"
        defaultSuggestions="{{suggestions}}"
    />
  </div>
</template>
<script>
import mention from 'santd/mention';
export default {
    components: {
        's-mention': mention
    },
    initData() {
        return {
            suggestions: ['wangyongqing', 'mayihui', 'fuqiangqiang', 'zhangtingting', 'raowenjuan']
        };
    }
}
</script>
```
