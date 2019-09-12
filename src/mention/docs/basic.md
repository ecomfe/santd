<text lang="cn">
#### 基本使用
基本使用
</text>

```html
<template>
  <div>
    <s-mention
        defaultValue="@afc163"
        defaultSuggestions="{{suggestions}}"
        placeholder="this is default Mention"
        on-select="onSelect"
        on-change="onChange"
    />
  </div>
</template>
<script>
import Mention from 'santd/mention';
export default {
    components: {
        's-mention': Mention
    },
    initData() {
        return {
            suggestions: ['wangyongqing', 'mayihui', 'fuqiangqiang', 'zhangtingting', 'raowenjuan']
        };
    },
    onSelect(suggestion) {
        console.log('onSelect', suggestion);
    },
    onChange(suggestionsList) {
        console.log('onChange', suggestionsList)
    }
}
</script>
```
