<text lang="cn">
#### 不区分大小写
不区分大小写的 AutoComplete
</text>

```html
<template>
  <div>
  	<s-auto-complete
        dataSource="{{dataSource}}"
        style="width: 200px;"
        placeholder="try to type 'b"
        filterOption="{{filterOption}}"
        value="Burns Bay Road"
    >
    </s-auto-complete>
  </div>
</template>
<script>
import autoComplete from 'santd/auto-complete';
import input from 'santd/input';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
const filterOption = function (inputValue, option) {
    return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
};

export default {
    components: {
        's-auto-complete': autoComplete,
        's-input': input
    },
    initData() {
        return {
            dataSource: dataSource,
            filterOption: filterOption
        };
    },
}
</script>
```
