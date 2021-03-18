<codebox>
#### 自定义页脚
更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。
不需要默认确定取消按钮时，你可以把 `hasFooter` 设为 `false`。(hasFooter="{{false}}")

```html
<template>
    <div class="demo-footer">
        <s-button type="primary" on-click="clickHandler">Open Modal with customized footer</s-button>
        <s-modal title="Title"
            visible="{=visible=}"
            on-ok="handleOk"
            on-cancel="handleCancel"
            confirmLoading="{{confirmLoading}}"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <template slot="footer">
                <s-button on-click="handleCancel">Return</s-button>
                <s-button type="primary" loading="{{loading}}" on-click="handleOk">Submit</s-button>
            </template>
        </s-modal>
    </div>
</template>

<script>
import {Modal, Button} from 'santd';

export default {
    components: {
        's-button': Button,
        's-modal': Modal
    },
    clickHandler() {
        this.data.set('visible', true);
    },
    initData() {
        return {
            loading: false,
            visible: false
        };
    },
    handleOk(e) {
        this.data.set('loading', true);
        setTimeout(() => {
            this.data.set('visible', false);
            this.data.set('loading', false);
        }, 3000);
    },
    handleCancel(e) {
        console.log(e);
        this.data.set('visible', false);
    }
}
</script>
```
</codebox>
