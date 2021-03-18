<codebox>
#### 从浮层内关闭
使用 `visible` 属性控制浮层显示。

```html
<template>
    <div>
        <s-popover title="title" visible="{{visible}}" trigger="click" on-visibleChange="handleVisibleChange">
            <a slot="content" href="javascript:void(0);" on-click="hide">Close</a>
            <s-button type="primary">Click Me</s-button>
        </s-popover>
    </div>
</template>
<script>
import san from 'san';
import {Popover, Button} from 'santd';

export default {
    components: {
        's-popover': Popover,
        's-button': Button
    },
    initData() {
        return {
            visible: false
        }
    },
    hide() {
        this.data.set('visible', false);
    },
    handleVisibleChange(visible) {
        this.data.set('visible', visible);
    }
}
</script>
```
</codebox>
