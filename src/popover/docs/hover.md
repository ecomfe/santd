<text lang="cn">
#### 从浮层内关闭
使用 `visible` 属性控制浮层显示。
</text>

```html
<template>
    <div>
        <s-popover
            trigger="hover"
            visible="{{hovered}}"
            on-visibleChange="handleHoverVisibleChange"
            title="Hover title"
            content="{{hoverContent}}"
        >
            <s-popover
                title="Click title"
                trigger="click"
                visible="{{clicked}}"
                on-visibleChange="handleClickVisibleChange"
                content="{{clickContent}}"
            >
                <s-button>Hover and click / 悬停并点击</s-button>
            </s-popover>
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
            hovered: false,
            clicked: false,
            hoverContent: 'This is hover content.',
            clickContent: san.defineComponent({
                hide() {
                    this.dispatch('hide');
                },
                template: `<div><div>This is click content.</div><a href="javascript:void(0);" on-click="hide">Close</a></div>`
            }),
        }
    },
    messages: {
        hide() {
            this.data.set('clicked', false);
            this.data.set('hovered', false);
        }
    },
    handleHoverVisibleChange(visible) {
        this.data.set('hovered', visible);
        this.data.set('clicked', false);
    },
    handleClickVisibleChange(visible) {
        this.data.set('hovered', false);
        this.data.set('clicked', visible);
    }
}
</script>
```
