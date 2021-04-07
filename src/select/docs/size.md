<text lang="cn">
#### 三种大小
三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。
</text>

```html
<template>
    <div>
        <s-radio-group defaultValue="{{size}}" name="size" on-change="handleSizeChange">
            <s-radio-button value="large">Large</s-radio-button>
            <s-radio-button value="default">Default</s-radio-button>
            <s-radio-button value="small">Small</s-radio-button>
        </s-radio-group>
        <br/><br/>
        <s-select
            defaultValue="a10"
            style="width: 200px; margin-bottom: 10px;"
            size="{{size}}"
            on-change="handleChange"
        >
            <s-select-option
                s-for="val in children"
                value="{{val}}"
            >{{val}}</s-select-option>
        </s-select>
        <br/>
        <s-select
            mode="multiple"
            size="{{size}}"
            placeholder="Please select"
            style="width: 100%; margin-bottom: 10px;"
            defaultValue="{{['a10', 'c12']}}"
            on-change="handleChange"
        >
            <s-select-option
                s-for="val in children"
                value="{{val}}"
            >{{val}}</s-select-option>
        </s-select>
        <br/>
        <s-select
            mode="tags"
            size="{{size}}"
            placeholder="Please select"
            style="width: 100%;"
            defaultValue="{{['a10', 'c12']}}"
        >
            <s-select-option
                s-for="val in children"
                value="{{val}}"
            >{{val}}</s-select-option>
        </s-select>
    </div>
</template>

<script>
import Radio from 'santd/radio';
import {Select} from 'santd';

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
}

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-radio-group': Radio.Group,
        's-radio-button': Radio.Button
    },
    initData() {
        return {
            children,
            size: 'default'
        };
    },
    handleChange(value) {
        console.log(`selected ${value}`);
    },
    handleSizeChange(e) {
        this.data.set('size', e.target.value);
    }
}
</script>
```
