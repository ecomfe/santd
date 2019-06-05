<cn>
#### 基本使用
基本使用。通过 dataSource 设置自动完成的数据源
</cn>

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        on-select="handleSelect"
        dataSource="{{dataSource}}"
        style="width: 200px;"
        placeholder="input some"
        defaultOpen="{{true}}">
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
            dataSource: ['a','b','c','d'],
        };
    },
    handleSearch(value) {
        console.log('handle search', value);
        this.data.set('dataSource', [
            value,
            value + value,
            value + value + value
        ]);
    },
    handleSelect(value) {
        console.log('handle select', value);
    }
}
</script>
```