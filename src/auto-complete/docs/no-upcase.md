<codebox>
#### 不区分大小写
不区分大小写的 AutoComplete

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
import {AutoComplete} from 'santd';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
const filterOption = function (inputValue, option) {
    return option.data.get('value').toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
};

export default {
    components: {
        's-auto-complete': AutoComplete
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
</codebox>
