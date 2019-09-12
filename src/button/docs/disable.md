<text lang="cn">
#### 不可用状态
添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
</text>

```html
<template>
    <div>
        <s-button type="primary">Primary</s-button>
        <s-button type="primary" disabled>Primary(disabled)</s-button>
        <br />
        <s-button type="default">Default</s-button>
        <s-button type="default" disabled>Default(disabled)</s-button>
        <br />
        <s-button type="danger">Danger</s-button>
        <s-button type="danger" disabled>Danger(disabled)</s-button>
        <br />
        <s-button type="dashed">Dashed</s-button>
        <s-button type="dashed" disabled>Dashed(disabled)</s-button>
        <br />
        <s-button type="link">Link</s-button>
        <s-button type="link" disabled>Link(disabled)</s-button>
        <br />
        <div style="padding: 8px 8px 0 8px; background: rgb(190, 200, 200)">
            <s-button ghost>Ghost</s-button>
            <s-button ghost disabled>Ghost(disabled)</s-button>
        </div>
    </div>
</template>
<script>
import Button from 'santd/button';
export default {
    components: {
        's-button': Button
    }
}
</script>
```
