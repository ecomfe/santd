<text lang="cn">
#### 悬停点击弹出窗口
以下示例显示如何创建可悬停和单击的弹出窗口。
</text>

```html
<template>
    <div>
        <s-popover
            trigger="hover"
            visible="{{hovered}}"
            on-visibleChange="handleHoverVisibleChange"
            title="Hover title"
            content="This is hover content."
        >
            <s-popover
                title="Click title"
                trigger="click"
                visible="{{clicked}}"
                on-visibleChange="handleClickVisibleChange"
            >
                <template slot="content">
                    <div>This is click content.</div><a href="javascript:void(0);" on-click="hide">Close</a>
                </template>
                <s-button>Hover and click / 悬停并点击</s-button>
            </s-popover>
        </s-popover>
    </div>
</template>
<script>
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
            clicked: false
        }
    },
    hide() {
        this.data.set('clicked', false);
        this.data.set('hovered', false);
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
