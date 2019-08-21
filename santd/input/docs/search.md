<text lang="cn">
#### 搜索框
带有搜索按钮的输入框。
</text>

```html
<template>
    <div>
        <div style="margin-bottom: 16px">
            <s-input-search
                placeholder="input search text"
                on-search="onSearch"
                style="width: 200px;"
            ></s-input-search>
        </div>
        <div style="margin-bottom: 16px">
            <s-input-search placeholder="input search text" enterButton="{{true}}" on-search="onSearch"></s-input-search>
        </div>
        <div style="margin-bottom: 16px">
            <s-input-search placeholder="input search text" enterButton="Search" on-search="onSearch" size="large"></s-input-search>
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
    }
}
</script>
```
