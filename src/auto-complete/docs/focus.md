<text lang="cn">
#### 获取/移除焦点
focus获取焦点、blur移除焦点
</text>

```html
<template>
  <div>
    <s-button type="primary" on-click="handleToggle">focus</s-button>
    <s-button type="primary" on-click="handlefToggle">blur</s-button>
  	<s-auto-complete
        s-ref="autoComlete"
        on-search="handleSearch"
        on-select="handleSelect"
        dataSource="{{dataSource}}"
        style="width: 200px;margin-top:10px;"
        dropdownMenuStyle="{{dropdownMenuStyle}}"
        placeholder="input some"
    >
    </s-auto-complete>
  </div>
</template>
<script>
import {AutoComplete, Button} from 'santd';

export default {
    components: {
        's-auto-complete': AutoComplete,
        's-button': Button
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
    },
    handleToggle() {
        this.ref('autoComlete').focus();
    },
    handlefToggle() {
        this.ref('autoComlete').blur();
    }
}
</script>
```
