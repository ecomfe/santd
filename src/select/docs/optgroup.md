<text lang="cn">
#### 分组
用 `OptGroup` 进行选项分组。
</text>

```html
<template>
    <div>
        <s-select defaultValue="{{['lucy']}}" style="width: 200px;" on-change="handleChange">
            <s-select-opt-group label="Manager">
                <s-select-option value="jack">Jack</s-select-option>
                <s-select-option value="lucy">Lucy</s-select-option>
            </s-select-opt-group>
            <s-select-opt-group label="Engineer">
                <s-select-option value="yiminghe">Yiminghe</s-select-option>
            </s-select-opt-group>
        </s-select>
    </div>
</template>

<script>
import {Select} from 'santd';

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-select-opt-group': Select.OptGroup
    },
    handleChange(value) {
        console.log(`selected ${value}`);
    }
}
</script>
```
