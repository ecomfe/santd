<text lang="cn">
#### 自定义输入组件
自定义输入组件
</text>

```html
<template>
  <div>
    <s-auto-complete
        on-search="handleSearch"
        on-select="handleSelect"
        dataSource="{{dataSource}}"
        style="width: 200px;"
        value="{{value}}"
    >
        <s-textarea
            slot="custom"
            placeholder="input here"
            style="height: 50px"
            value="{{value}}"
            on-inputChange="textareaChange"
        ></s-textarea>
    </s-auto-complete>
  </div>
</template>
<script>
import autoComplete from 'santd/auto-complete';
import input from 'santd/input';

export default {
    components: {
        's-auto-complete': autoComplete,
        's-textarea': input.TextArea
    },
    initData() {
        return {
            dataSource: [],
            value: ''
        };
    },
    handleSearch(value) {
        if (value) {
            this.data.set('dataSource', [
                value,
                value + value,
                value + value + value
            ]);
        } else {
            this.data.set('dataSource', []);
        }
    },
    handleSelect(value) {
        this.data.set('value', value);
    },
    textareaChange(val) {
        this.handleSearch(val);;
    }
}
</script>
```
