<cn>
#### 自定义选项
也可以直接传 `AutoComplete.Option` 作为 `AutoComplete` 的 `children`，而非使用 `dataSource`。
</cn>

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        style="width: 200px;">
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
import autoComplete from 'santd/auto-complete';

export default {
    components: {
        's-auto-complete': autoComplete,
        's-select-option': autoComplete.Option
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
    }
}
</script>
```