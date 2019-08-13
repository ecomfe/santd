<text lang="cn">
#### 位置
位置有12个方向。
</text>

```html
<template>
    <div class="demo">
        <div style="margin-left: 70px; white-space: nowrap;">
            <s-tooltip placement="topLeft" title="prompt text">
                <s-button>TL</s-button>
            </s-tooltip>
            <s-tooltip placement="top" title="prompt text">
                <s-button>Top</s-button>
            </s-tooltip>
            <s-tooltip placement="topRight" title="prompt text">
                <s-button>TR</s-button>
            </s-tooltip>
        </div>
        <div style="width: 70px; float: left;">
            <s-tooltip placement="leftTop" title="prompt text">
                <s-button>LT</s-button>
            </s-tooltip>
            <s-tooltip placement="left" title="prompt text">
                <s-button>Left</s-button>
            </s-tooltip>
            <s-tooltip placement="leftBottom" title="prompt text">
                <s-button>LB</s-button>
            </s-tooltip>
        </div>
        <div style="width: 70px; margin-left: 304px; ">
            <s-tooltip placement="rightTop" title="prompt text">
                <s-button>RT</s-button>
            </s-tooltip>
            <s-tooltip placement="right" title="prompt text">
                <s-button>Right</s-button>
            </s-tooltip>
            <s-tooltip placement="rightBottom" title="prompt text">
                <s-button>RB</s-button>
            </s-tooltip>
        </div>
        <div style="margin-left: 70px; clear: both; white-space: nowrap">
            <s-tooltip placement="bottomLeft" title="prompt text">
                <s-button>BL</s-button>
            </s-tooltip>
            <s-tooltip placement="bottom" title="prompt text">
                <s-button>Bottom</s-button>
            </s-tooltip>
            <s-tooltip placement="bottomRight" title="prompt text">
                <s-button>BR</s-button>
            </s-tooltip>
        </div>
    </div>
</template>
<script>
import tooltip from 'santd/tooltip';
import button from 'santd/button';
export default {
    components: {
        's-tooltip': tooltip,
        's-button': button
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
