<cn>
#### 单选组合 - 配合 name 使用
可以为 RadioGroup 配置 `name` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把 RadioGroup 下的 Radio 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。
</cn>

```html
<template>
    <div>
        <s-group name="radiogroup" defaultValue="{{1}}">
            <s-radio value="{{1}}">A</s-radio>
            <s-radio value="{{2}}">B</s-radio>
            <s-radio value="{{3}}">C</s-radio>
            <s-radio value="{{4}}">D</s-radio>
        </s-group>
    </div>
</template>
<script>
import radio from 'santd/radio';

export default {
    components: {
        's-radio': radio,
        's-group': radio.Group
    }
}
</script>
```
