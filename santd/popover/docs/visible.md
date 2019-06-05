<cn>
#### 从浮层内关闭
使用 `visible` 属性控制浮层显示。
</cn>

```html
<template>
    <div>
        <s-popover title="title" visible="{{visible}}" trigger="click" visible="{{visible}}" on-visibleChange="handleVisibleChange" content="{{content}}">
            <s-button type="primary">Click Me</s-button>
        </s-popover>
    </div>
</template>
<script>
import san from 'san';
import Popover from 'santd/popover';
import Button from 'santd/button';
export default {
    components: {
        's-popover': Popover,
        's-button': Button
    },
    initData() {
        return {
            visible: false,
            content: san.defineComponent({
                hide() {
                    this.dispatch('hide');
                },
                template: `<div><a href="javascript:void(0);" on-click="hide">Close</a></div>`
            })
        }
    },
    messages: {
        hide() {
            this.data.set('visible', false);
        }
    },
    handleVisibleChange(visible) {
        this.data.set('visible', visible);
    }
}
</script>
```
