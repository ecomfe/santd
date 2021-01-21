<text lang="cn">
#### 自定义选项
也可以直接传 `AutoComplete.Option` 作为 `AutoComplete` 的 `children`，而非使用 `dataSource`。
</text>

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        on-select="onSelect"
        style="width: 200px;"
    >
        <s-select-option
            s-for="item in list"
            value="{{item}}"
        >
            {{item}}
        </s-select-option>
    </s-auto-complete>
  </div>
</template>
<script>
import {AutoComplete} from 'santd';

export default {
    components: {
        's-auto-complete': AutoComplete,
        's-select-option': AutoComplete.Option
    },
    initData() {
        return {
            list: []
        };
    },
    handleSearch(value) {
        let list;
        if (!value || value.indexOf('@') >= 0) {
          list = [];
        } else {
          list = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.data.set('list', list);
    },
    onSelect(val) {
        console.log('select-', val);
    }
}
</script>
```
