<cn>
#### 按钮样式
按钮样式的单选组合。
</cn>

```html
<template>
    <div>
        <div>
            <s-group defaultValue="a" on-change="handleChange">
                <s-button value="a">Hangzhou</s-button>
                <s-button value="b">Shanghai</s-button>
                <s-button value="c">Beijing</s-button>
                <s-button value="d">Chengdu</s-button>
            </s-group>
        </div>
        <div style="margin-top: 16px;">
            <s-group defaultValue="a" on-change="handleChange">
                <s-button value="a">Hangzhou</s-button>
                <s-button value="b" disabled>Shanghai</s-button>
                <s-button value="c">Beijing</s-button>
                <s-button value="d">Chengdu</s-button>
            </s-group>
        </div>
        <div style="margin-top: 16px;">
            <s-group defaultValue="a" on-change="handleChange" disabled>
                <s-button value="a">Hangzhou</s-button>
                <s-button value="b">Shanghai</s-button>
                <s-button value="c">Beijing</s-button>
                <s-button value="d">Chengdu</s-button>
            </s-group>
        </div>
    </div>
</template>
<script>
import Radio from 'santd/radio';

export default {
    components: {
        's-radio': Radio,
        's-group': Radio.Group,
        's-button': Radio.Button
    },
    handleChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }
}
</script>
```
