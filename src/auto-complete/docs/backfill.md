<codebox>
#### 使用键盘选择时自动回填
使用键盘选择选项的时候把选中项回填到输入框中。

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
        backfill="{{true}}"
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
