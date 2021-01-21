<text lang="cn">
#### 不可用状态
添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。
</text>

```html
<template>
    <div>
        <s-button type="primary">Primary</s-button>
        <s-button type="primary" disabled="{{true}}">Primary(disabled)</s-button>
        <br />
        <s-button type="default">Default</s-button>
        <s-button type="default" disabled="{{true}}">Default(disabled)</s-button>
        <br />
        <s-button type="danger">Danger</s-button>
        <s-button type="danger" disabled="{{true}}">Danger(disabled)</s-button>
        <br />
        <s-button type="dashed">Dashed</s-button>
        <s-button type="dashed" disabled="{{true}}">Dashed(disabled)</s-button>
        <br />
        <s-button type="link">Link</s-button>
        <s-button type="link" disabled="{{true}}">Link(disabled)</s-button>
        <br />
        <div style="padding: 8px 8px 0 8px; background: rgb(190, 200, 200)">
            <s-button ghost="{{true}}">Ghost</s-button>
            <s-button ghost="{{true}}" disabled="{{true}}">Ghost(disabled)</s-button>
        </div>
    </div>
</template>
<script>
import {Button} from 'santd';

export default {
    components: {
        's-button': Button
    }
}
</script>
```
