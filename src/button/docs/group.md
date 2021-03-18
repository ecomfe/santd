<codebox>
#### 按钮组合
可以将多个 `Button` 放入 `Button.Group` 的容器中。

通过设置 `size` 为 `large` `small` 分别把按钮组合设为大、小尺寸。若不设置 `size`，则尺寸为中。

```html
<template>
    <div>
        <h4>Basic</h4>
        <s-buttongroup>
            <s-button>Cancel</s-button>
            <s-button>OK</s-button>
        </s-buttongroup>
        <s-buttongroup>
            <s-button disabled="{{true}}">L</s-button>
            <s-button disabled="{{true}}">M</s-button>
            <s-button disabled="{{true}}">R</s-button>
        </s-buttongroup>
        <s-buttongroup>
            <s-button>L</s-button>
            <s-button>M</s-button>
            <s-button>R</s-button>
        </s-buttongroup>

        <h4>With Icon</h4>
        <s-buttongroup>
            <s-button type="primary">
                <s-icon type="left" /> Go back
            </s-button>
            <s-button type="primary">
                Go forward <s-icon type="right" />
            </s-button>
        </s-buttongroup>
        <s-buttongroup>
            <s-button type="primary" icon="cloud" />
            <s-button type="primary" icon="cloud-download" />
        </s-buttongroup>
        <s-buttongroup>
            <s-button type="primary" icon="cloud" size="small" />
            <s-button type="primary" icon="cloud-download" size="small" />
        </s-buttongroup>
    </div>
</template>
<script>
import {Button, Icon} from 'santd';

export default {
    components: {
        's-button': Button,
        's-buttongroup': Button.Group,
        's-icon': Icon
    }
}
</script>
```
</codebox>
