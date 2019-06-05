<cn>
#### 搜索框
带有搜索按钮的输入框。
</cn>

```html
<template>
  <div>
  <div style="margin-bottom: 16px">
      <s-input-search
          defaultValue="default"
          on-search="onSearch"
          on-pressEnter="onPressEnter"
          style="width: 200px;"
      ></s-input-search>
    </div>
    <div style="margin-bottom: 16px">
      <s-input-search placeholder="input search text" enterButton="" on-search="onSearch"></s-input-search>
    </div>
   <div style="margin-bottom: 16px">
      <s-input-search placeholder="input search text" enterButton="Search" on-search="onSearch"></s-input-search>
    </div>
  </div>
</template>
<script>
import Input from 'santd/input';
import Icon from 'santd/icon';
export default {
    components: {
        's-input': Input,
        's-icon': Icon,
        's-input-search': Input.Search
    },
    onSearch(value) {
        console.log('the search value is: ', value);
    },
    onPressEnter(value) {
      console.log('enter value is: ', value);
    }
}
</script>
```
