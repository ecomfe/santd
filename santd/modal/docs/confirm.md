<cn>
#### 确认对话框
使用 `confirm()` 可以快捷地弹出确认框。
</cn>

```html
<template>
    <div class="demo-confirm">
        <s-button on-click="showConfirm">Confirm</s-button>
        <s-button on-click="showDeleteConfirm" type="dashed">Delete</s-button>
        <s-button on-click="showPropsConfirm" type="dashed">With extra props</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import modal from 'santd/modal';

const confirm = modal.confirm;

export default {
    components: {
        's-button': button
    },
    showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    },
    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    },
    showPropsConfirm() {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
                disabled: true,
            },
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
}
</script>

<style>
.demo-confirm {}
</style>
```
