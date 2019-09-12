<text lang="cn">
#### 大小
大中小三种组合，可以和表单输入框进行对应配合。
</text>

```html
<template>
    <div>
        <div>
            <s-group defaultValue="a" size="large" name="group1">
                <s-button value="a">Hangzhou</s-button>
                <s-button value="b">Shanghai</s-button>
                <s-button value="c">Beijing</s-button>
                <s-button value="d">Chengdu</s-button>
            </s-group>
        </div>
        <div style="margin-top: 16px;">
            <s-group defaultValue="a" name="group2">
                <s-button value="a">Hangzhou</s-button>
                <s-button value="b">Shanghai</s-button>
                <s-button value="c">Beijing</s-button>
                <s-button value="d">Chengdu</s-button>
            </s-group>
        </div>
        <div style="margin-top: 16px;">
            <s-group defaultValue="a" size="small" name="group3">
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
    }
}
</script>
```
