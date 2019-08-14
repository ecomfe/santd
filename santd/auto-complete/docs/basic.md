<text lang="cn">
#### 基本使用
基本使用。通过 dataSource 设置自动完成的数据源
</text>

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        on-select="handleSelect"
        dataSource="{{dataSource}}"
        style="width: 200px;"
        placeholder="input some"
    >
    </s-auto-complete>
  </div>
</template>
<script>
import autoComplete from 'santd/auto-complete';
import input from 'santd/input';

export default {
    components: {
        's-auto-complete': autoComplete,
        's-input': input
    },
    initData() {
        return {
            dataSource: []
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
        console.log('handle select', value);
    }
}
</script>
```
