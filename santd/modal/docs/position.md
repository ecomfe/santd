<text lang="cn">
#### 自定义位置
使用 `centered` 或 `modalStyle` 添加top样式来设置对话框位置。
</text>

```html
<template>
    <div class="demo-position">
        <s-button type="primary" on-click="setModal1Visible(true)">Display a modal dialog at 20px to Top</s-button>
        <s-modal title="20px to Top"
            visible="{=modal1Visible=}"
            modalStyle="top:20px;"
            on-ok="setModal1Visible(false)"
            on-cancel="setModal1Visible(false)"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </s-modal>
        <br/><br/>
        <s-button type="primary" on-click="setModal2Visible(true)">Vertically centered modal dialog</s-button>
        <s-modal centered
            title="Vertically centered modal dialog"
            visible="{=modal2Visible=}"
            on-ok="setModal2Visible(false)"
            on-cancel="setModal2Visible(false)"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </s-modal>
    </div>
</template>

<script>
import button from 'santd/button';
import modal from 'santd/modal';

export default {
    components: {
        's-button': button,
        's-modal': modal
    },
    initData() {
        return {
            modal1Visible: false,
            modal2Visible: false
        };
    },
    setModal1Visible(modal1Visible) {
        this.data.set('modal1Visible', modal1Visible);
    },
    setModal2Visible(modal2Visible) {
        this.data.set('modal2Visible', modal2Visible);
    }
}
</script>

<style>
.demo-position {}
</style>
```
