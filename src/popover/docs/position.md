<codebox>
#### 位置
位置有12个方向。

```html
<template>
    <div class="demo">
        <div style="margin-left: 70px; white-space: nowrap;">
            <s-popover placement="topLeft" content="content" title="Title">
                <s-button>TL</s-button>
            </s-popover>
            <s-popover placement="top" content="content" title="Title">
                <s-button>Top</s-button>
            </s-popover>
            <s-popover placement="topRight" content="content" title="Title">
                <s-button>TR</s-button>
            </s-popover>
        </div>
        <div style="width: 70px; float: left;">
            <s-popover placement="leftTop" content="content" title="Title">
                <s-button>LT</s-button>
            </s-popover>
            <s-popover placement="left" content="content" title="Title">
                <s-button>Left</s-button>
            </s-popover>
            <s-popover placement="leftBottom" content="content" title="Title">
                <s-button>LB</s-button>
            </s-popover>
        </div>
        <div style="width: 70px; margin-left: 304px; ">
            <s-popover placement="rightTop" content="content" title="Title">
                <s-button>RT</s-button>
            </s-popover>
            <s-popover placement="right" content="content" title="Title">
                <s-button>Right</s-button>
            </s-popover>
            <s-popover placement="rightBottom" content="content" title="Title">
                <s-button>RB</s-button>
            </s-popover>
        </div>
        <div style="margin-left: 70px; clear: both; white-space: nowrap">
            <s-popover placement="bottomLeft" content="content" title="Title">
                <s-button>BL</s-button>
            </s-popover>
            <s-popover placement="bottom" content="content" title="Title">
                <s-button>Bottom</s-button>
            </s-popover>
            <s-popover placement="bottomRight" content="content" title="Title">
                <s-button>BR</s-button>
            </s-popover>
        </div>
    </div>
</template>
<script>
import {Popover, Button} from 'santd';

export default {
    components: {
        's-popover': Popover,
        's-button': Button
    }
}
</script>
<style type="text/css">
    .demo {
        overflow: hidden;
    }
    .demo .san-btn {
        width: 70px;
        margin-bottom: 5px;
    }
</style>
```
</codebox>
