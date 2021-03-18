<codebox>
#### 基本使用
基本使用。通过 dataSource 设置自动完成的数据源

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        on-select="handleSelect"
        dataSource="{{dataSource}}"
        style="width: 200px;"
        dropdownMenuStyle="{{dropdownMenuStyle}}"
        placeholder="input some"
    >
    </s-auto-complete>
  </div>
</template>
<script>
import {AutoComplete} from 'santd';

export default {
    components: {
        's-auto-complete': AutoComplete
    },
    initData() {
        return {
            dataSource: [],
            dropdownMenuStyle: 'width: 200px'
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
</codebox>
