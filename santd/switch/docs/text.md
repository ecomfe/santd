<cn>
#### 文字和图标
带有文字和图标。
</cn>
```html
<template>
    <div>
        <s-switch defaultChecked on-change='onChange'>
            <template slot='checkedChildren'>N</template>
            <template slot='unCheckedChildren'>Y</template>
        </s-switch><br />
         <s-switch defaultChecked disabled on-change='onChange' checkedChildren="1" unCheckedChildren="0" /><br />
         <s-switch defaultChecked on-change='onChange'><br />
            <s-icon slot='checkedChildren' type="check" />
            <s-icon slot='unCheckedChildren' type="login" />
        </s-switch>
    </div>
</template>
<script>
import Switch from 'santd/switch';
import Icon from 'santd/icon';
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
