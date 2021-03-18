<codebox>
#### 向上展开
向上展开建议

```html
<template>
  <div>
    <s-mention
        defaultVaule="@afc163"
        defaultSuggestions="{{suggestions}}"
        placeholder="this is default Mention"
        placement="top"
        on-select="onSelect"
        on-change="onChange"
        on-focus="onFocus"
        on-blur="onBlur"
    />
  </div>
</template>
<script>
import {Mention} from 'santd';

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
    onFocus(e) {
        console.log('onFocus', e);
    },
    onBlur(e) {
        console.log('onBlur', e);
    },
    onChange(suggestionsList) {
        console.log('onChange', suggestionsList)
    }
}
</script>
```
</codebox>
