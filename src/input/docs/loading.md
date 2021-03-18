<codebox>
#### 搜索框loading
用于 onSearch 的时候展示 loading。

```html
<template>
    <div>
        <div style="margin-bottom: 16px">
            <s-input-search
                placeholder="input search text"
                on-search="onSearch"
                style="width: 200px;"
                loading="{{true}}"
            ></s-input-search>
        </div>
        <div style="margin-bottom: 16px">
            <s-input-search loading="{{true}}" placeholder="input search text" enterButton="{{true}}" on-search="onSearch"></s-input-search>
        </div>
    </div>
</template>
<script>
import {Input, Icon} from 'santd';

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
</codebox>
