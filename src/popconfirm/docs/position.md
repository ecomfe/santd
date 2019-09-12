<text lang="cn">
#### 位置
位置有十二个方向。如需箭头指向目标元素中心，可以设置 `arrowPointAtCenter`。
</text>

```html
<template>
    <div class="demo">
        <div style="margin-left: 70px; white-space: nowrap">
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="topLeft">
                <s-button>TL</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="top">
                <s-button>Top</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="topRight">
                <s-button>TR</s-button>
            </s-popconfirm>
        </div>
        <div style="width: 70px; float: left">
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="leftTop">
                <s-button>LT</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="left">
                <s-button>Left</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="leftBottom">
                <s-button>LB</s-button>
            </s-popconfirm>
        </div>
        <div style="width: 70px; margin-left: 304px;">
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="rightTop">
                <s-button>RT</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="right">
                <s-button>Right</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="rightBottom">
                <s-button>RB</s-button>
            </s-popconfirm>
        </div>
        <div style="margin-left: 70px; clear: both; white-space: nowrap;">
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="bottomLeft">
                <s-button>BL</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="bottom">
                <s-button>Bottom</s-button>
            </s-popconfirm>
            <s-popconfirm title="{{title}}" okText="Yes" cancelText="No" on-confirm="handleConfirm" placement="bottomRight">
                <s-button>BR</s-button>
            </s-popconfirm>
        </div>
    </div>
</template>
<script>
import popconfirm from 'santd/popconfirm';
import message from 'santd/message';
import button from 'santd/button';
export default {
    components: {
        's-popconfirm': popconfirm,
        's-button': button
    },
    initData() {
        return {
            title: 'Are you sure delete this task?'
        }
    },
    handleConfirm(e) {
        console.log(e);
        message.success('Click on Yes');
    },
    handleCancel(e) {
        console.log(e);
        message.error('Click on No');
    }
}
</script>
<style>
    .demo {
        margin-left: 200px;
        overflow: hidden;
    }
</style>
```
