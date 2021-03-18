<codebox>
#### 文字和图标
带有文字和图标。

```html
<template>
    <div>
        <s-switch defaultChecked="{{true}}" on-change='onChange'>
            <template slot='checkedChildren'>N</template>
            <template slot='unCheckedChildren'>Y</template>
        </s-switch><br />
         <s-switch defaultChecked="{{true}}" disabled="{{true}}" on-change='onChange' checkedChildren="1" unCheckedChildren="0" /><br />
         <s-switch defaultChecked="{{true}}" on-change='onChange'><br />
            <s-icon slot='checkedChildren' type="check" />
            <s-icon slot='unCheckedChildren' type="login" />
        </s-switch>
    </div>
</template>
<script>
import {Switch, Icon} from 'santd';

export default {
    components: {
        's-switch': Switch,
        's-icon': Icon,
    },
    initData() {
        return {
            checked: true,
        }
    },
    onChange(checked) {
        console.log(checked);
    }
}
</script>
```
</codebox>
