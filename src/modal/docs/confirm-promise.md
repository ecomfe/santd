<codebox>
#### 确认对话框
使用 `confirm()` 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭

```html
<template>
    <div class="demo-confirm-promise">
        <s-button on-click="showConfirm">Confirm</s-button>
    </div>
</template>

<script>
import {Modal, Button} from 'santd';

const confirm = Modal.confirm;

export default {
    components: {
        's-button': Button
    },
    showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
}
</script>
```
</codebox>
