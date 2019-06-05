<cn>
#### 扩展菜单
使用 `dropdownRender` 对下拉菜单进行自由扩展。
</cn>

```html
<template>
    <div>
        <s-select
            defaultValue="lucy"
            style="width:120px;"
            dropdownRender="{{dropdownRender}}"
        >
            <s-select-option value="jake">Jake</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
        </s-select>
    </div>
</template>
<script>
import san from 'san';
import Select from 'santd/select';
import Icon from 'santd/icon';
import Menu from 'santd/menu';
import Divider from 'santd/divider';

const dropRender = san.defineComponent({
    components: {
        's-divider': Divider,
        's-icon': Icon
    },
    template: `
        <div>
            <s-divider style="margin: 4px 0"/>
            <div style="padding: 8px;cursor:pointer">
                <s-icon type="plus"/>
                Add item
            </div>
        </div>
    `
});

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-icon': Icon,
        's-menu': Menu,

    },
    initData() {
        return {
            dropdownRender: dropRender
        }
    }
}
</script>
```
