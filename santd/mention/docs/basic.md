<cn>
#### 基本使用
基本使用&向上展开建议。
</cn>

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
import Mention from 'santd/mention';
export default {
    components: {
        's-mention': Mention
    },
    initData() {
        return {
            suggestions: ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']
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
